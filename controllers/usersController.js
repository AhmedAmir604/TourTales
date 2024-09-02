import User from "../models/usersModel.js";
import ErrorHandler from "../utils/appError.js";
import { catchAsync } from "./errorController.js";
import { deleteOne, getAll, getOne, updateOne } from "./factoryFunctions.js";
import multer from "multer";
import sharp from "sharp";

const filterObjs = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../client/public/users");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

//Liked Tours is implementing over here!
export const getLikedTours = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id)
    .select("likedTours")
    .populate("likedTours");

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    count: user.length,
    user,
  });
});

export const addLikedTours = catchAsync(async (req, res, next) => {
  const toursId = req.body.likedTours;
  console.log(toursId);
  const { likedTours } = await User.findById(req.user.id).select("likedTours");
  const index = likedTours.indexOf(toursId);
  if (index > -1) {
    likedTours.splice(index, 1);
  } else {
    likedTours.push(toursId);
  }

  if (
    !(await User.findByIdAndUpdate(req.user.id, {
      likedTours: likedTours,
    }))
  ) {
    return next(new ErrorHandler("cant add rn!", 400));
  }

  res.status(201).json({
    status: "success",
    likedTours,
  });
});

export const getBookmarked = catchAsync(async (req, res, next) => {
  const tourId = await User.findById(req.user.id).select("likedTours");
  if (!tourId) {
    return next(new ErrorHandler("Something went wrong!"), 500);
  }

  res.status(200).json({
    status: "success",
    tourId,
  });
});

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  file.mimetype.startsWith("image")
    ? cb(null, true)
    : cb(new ErrorHandler("Please only upload image!", 400), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//Multer is used for uplaod
export const uploadUserPhoto = upload.single("photo");

//Here we are resizing the photo lowering quality too :)
export const resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`../client/public/users/${req.file.filename}`);
  next();
});

//users Route Handler Functions
export const updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new ErrorHandler("You cannot update password from here :(", 400)
    );
  }
  //Filter unwanted fileds :D
  const obj = filterObjs(req.body, "name", "email", "likedTours");

  //Here we remove the empty string coming from front-end because the react want controlled states to be defined
  Object.keys(obj).forEach((key) => {
    if (obj[key] === "" || obj[key] === " ") {
      delete obj[key];
    }
  });
  req.file && (obj.photo = req.file.filename);
  //Here we enter the data to be updated
  const updatedUser = await User.findByIdAndUpdate(req.user.id, obj, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "Success",
    data: {
      updatedUser,
    },
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.correctPassword(req.body.password, user.password))) {
    return next(new ErrorHandler("Password is not correct!"), 400);
  }
  await User.findByIdAndUpdate(user.id, { active: false });
  res.status(204).json({
    status: "Success",
    data: null,
  });
});

export const getME = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

//Do not update password by this updateUserAdmin because no Save middleware /trigger will not run :D
export const deleteUser = deleteOne(User);
export const updateUserAdmin = updateOne(User);
export const getAllUsers = getAll(User);
export const getUser = getOne(User);
