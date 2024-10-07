import User from "../models/usersModel.js";
import { catchAsync } from "./errorController.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/appError.js";
import { promisify } from "util";
import sendEmail from "../utils/email.js";
import crypto from "node:crypto";
import Email from "../utils/email.js";
import Token from "../models/tokenModel.js";

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  // const cookieOptions = {
  //   expires: new Date(
  //     Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  // };
  // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  user.password = undefined;
  user.active = undefined;
  res.status(statusCode).json({
    status: "success",
    token: token,
    data: {
      user,
    },
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangeTime: req.body.passwordChangeTime,
    role: req.body.role,
  });

  // ${req.get("host")}
  if (process.env.NODE_ENV === "development") {
    const url = `${req.protocol}://localhost:5173/users/me`;
  } else {
    const url = `${req.protocol}://${req.get("host")}/users/me`;
  }
  await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, req, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorHandler("Please provide valid email and password", 400)
    );
  }
  const user = await User.findOne({
    email: email,
    active: { $ne: false },
  }).select("+password");

  if (!user) {
    return next(new ErrorHandler("User does not exist with this email!", 401));
  }

  if (!(await user.correctPassword(password, user.password))) {
    return next(new ErrorHandler("Please provide valid credentials!", 401));
  }
  //commented this code cause not going to send mail on login becasue of free email sending limit
  // const url = `${req.protocol}://${
  //   process.env.NODE_ENV === "development" ? "localhost:5173" : req.get("host")
  // }/users/me`;
  // await new Email(user, url).sendWelcome();
  req.user = user;
  next();
  //Now i am adding 2fa feature my own addition :D thats why dont need to send token here can send token after otp verifcation
  // createSendToken(user, 200, req, res);
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    return next(new ErrorHandler("You are not logged in :( ", 401));
  }

  //Check here if the payload is not modefied in this case iD its error handle is done in errorController
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //Find here if the user still exist with the id
  const currentUser = await User.findById(decode.id);
  //Here we check if the user had not updated the password since last token was generated
  const timeCheck = await currentUser.passwordChanged(decode.iat);
  if (timeCheck) {
    console.log("TIMECHECK");
    return next(new ErrorHandler("Password updated please login again!", 401));
  }
  req.user = currentUser;
  next();
});

export const isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decode = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decode.id);
      if (!currentUser) {
        res.status(200);
      }
      if (!(await currentUser.passwordChanged(decode.iat))) {
        res.status(200).json({
          status: "success",
          data: {
            currentUser,
          },
        });
      }
    } catch (err) {
      res.status(203);
    }
  } else {
    res.status(203).json({
      status: "success",
    });
  }
};

//again its an addition by me :D
export const isLoggedInClient = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decode = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decode.id);
      if (!currentUser) {
        return next();
      }
      if (!(await currentUser.passwordChanged(decode.iat))) {
        req.user = currentUser;
        return next();
      }
    } catch (err) {
      return next();
    }
  } else {
    return next();
  }
};

export const restrictsTo = (...roles) => {
  return (req, res, next) => {
    // let str = "ahmed amir";
    // str = str.split(" ").join("");
    // console.log(str[4]); output will be   d
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler("You are not allowed to acces this!", 403));
    }
    next();
  };
};

export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ErrorHandler("Cannot find user with this email try again!", 400)
    );
  }
  const resetToken = await user.passwordChangeToken();
  await user.save({ validateBeforeSave: false });
  try {
    const url = `${req.protocol}://${
      process.env.NODE_ENV === "development"
        ? "localhost:5173"
        : req.get("host")
    }/users/resetPassword/${resetToken}`;
    await new Email(user, url).sendPasswordResetLink();
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;
    user.save({ validateModifiedOnly: true });

    return next(
      new ErrorHandler(
        "Cannot send email right now please try again later!",
        500
      )
    );
  }

  res.status(200).json({
    status: "200",
    message: "Email has been sent with password reset link!",
    token: resetToken,
  });
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const resetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: resetToken,
    passwordResetTokenExpiry: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "This Token has been expired please generate another!",
        401
      )
    );
  }

  if (!(await user.resetPassword(req.body.password))) {
    return next(
      new ErrorHandler("We got into some trouble pleaes try again later!", 400)
    );
  }

  createSendToken(user, 200, req, res);
});

export const updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const { password, newPassword, confirmNewPassword } = req.body;
  if (!password || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("Please enter password to continue!"), 400);
  }

  if (!(await user.correctPassword(password, user.password))) {
    return next(new ErrorHandler("Please enter correct password", 400));
  }
  //if we use findbyIdandUpdate this will not work as intended
  if (!(await user.updatePassword(newPassword, confirmNewPassword))) {
    return next(new ErrorHandler("Password does not match!", 400));
  }

  createSendToken(user, 201, req, res);
});

export const logout = (req, res) => {
  res.cookie("jwt", "loggedOut", {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
};

export const generateOtp = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(200).json({
      status: "sent",
    });
  } else {
    const token = await Token.create({ user: user.id });
    const otp = await token.generateOtp();
    if (token && (await new Email(user, otp).sendPasswordResetOTP())) {
      console.log(otp);
      res.status(200).json({
        status: "success",
        message: "Email has been sent with a code!",
      });
    } else {
      res.status(400).json({
        status: "failed",
      });
    }
  }
});

export const verifyOtp = catchAsync(async (req, res, next) => {
  const otp = crypto.createHash("sha256").update(req.body.otp).digest("hex");
  const token = await Token.findOne({ token: otp });
  if (!token) {
    return next(new ErrorHandler("Invalid or expired OTP try again! :("), 400);
  }
  const user = await User.findById(token.user);
  if (!user) {
    return next(
      new ErrorHandler("Cannot find user try again later DUDE!", 404)
    );
  }
  res.status(200).json({
    status: "success",
    token: otp,
  });
});

export const resetPasswordOtp = catchAsync(async (req, res, next) => {
  const token = await Token.findOne({ token: req.params.token }).populate(
    "user"
  );

  if (!token || !token.user) {
    return next(
      new ErrorHandler("Code has expired or user no longer exists!", 400)
    );
  }
  const user = token.user;

  if (!(await user.resetPassword(req.body.password))) {
    return next(
      new ErrorHandler(
        "Trouble resetting password, please try again later!",
        400
      )
    );
  }
  await Token.deleteOne({ _id: token._id });
  res.status(201).json({
    status: "success",
    description: "Password reset successfully!",
  });
});

export const generateOtpLogin = catchAsync(async (req, res, next) => {
  const token = await Token.create({ user: req.user.id });
  const otp = await token.generateOtp();
  console.log(otp);
  // && (await new Email(req.user, otp).sendPasswordResetOTP())
  if (token) {
    res.status(200).json({
      stauts: "success",
      description: "otp generated!",
      otp,
    });
  } else {
    return next(new ErrorHandler("cannot generate OTP!", 400));
  }
});

export const verifyOtpLogin = catchAsync(async (req, res, next) => {
  const otp = crypto.createHash("sha256").update(req.body.otp).digest("hex");
  const token = await Token.findOne({ token: otp });
  if (!token) {
    return next(new ErrorHandler("Invalid or expired OTP! :("), 400);
  }
  const user = await User.findById(token.user).select("+password");
  await Token.deleteOne(token._id);
  createSendToken(user, 200, req, res);
});
