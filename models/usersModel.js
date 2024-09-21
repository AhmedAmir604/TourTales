import bcrypt from "bcryptjs/dist/bcrypt.js";
import mongoose from "mongoose";
import crypto from "node:crypto";
import Tour from "./tourModel.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
      trim: true,
      minLength: [10, "Min length should be 10"],
      maxLength: [40, "Length cannot exceed 40 Charecters"],
    },
    email: {
      type: String,
      required: [true, "Please email is a must!"],
      unique: true,
      lowercase: true,
      validate: {
        validator: (val) => {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val);
        },
        message: "Please enter a valid email",
      },
    },
    photo: {
      type: String,
      default: "default.jpg",
    },
    role: {
      type: String,
      enum: ["admin", "user", "tour-lead", "guide"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please enter a password!"],
      minLength: [8, "Minimum of 8 charecters"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm password!"],
      validate: {
        validator: function (el) {
          return this.password === el;
        },
        message: "Password does not match!",
      },
    },
    passwordChangeTime: Date,
    passwordResetToken: String,
    passwordResetTokenExpiry: String,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    likedTours: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Tour",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//These are middleware (Triggers according to ahmed shafiq)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangeTime = Date.now() - 1000;
  next();
});

//Methods on docs start here
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassowrd
) {
  return await bcrypt.compare(candidatePassword, userPassowrd);
};

//This method is used for protect route to protect the restricted routes :D
userSchema.methods.passwordChanged = async function (jwtTime) {
  if (this.passwordChangeTime) {
    const updatedTime = parseInt(this.passwordChangeTime.getTime() / 1000, 10);
    // console.log(updatedTime, jwtTime);
    return updatedTime > jwtTime;
  }
  return false;
};

userSchema.methods.passwordChangeToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetTokenExpiry = Date.now() + 10 * 60 * 1000;
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  return resetToken;
};

// userSchema.methods.checkResetToken = async function(resetToken){
//   if(Date.now() < this.passwordResetTokenExpiry){
//     return true;
//   }
//   return false;
// }

userSchema.methods.resetPassword = async function (newPassword) {
  this.password = newPassword;
  this.passwordConfirm = newPassword;
  this.passwordResetToken = undefined;
  this.passwordResetTokenExpiry = undefined;
  await this.save();
  return true;
};

userSchema.methods.updatePassword = async function (
  newPassword,
  confirmNewPassword
) {
  this.password = newPassword;
  this.passwordConfirm = confirmNewPassword;
  return await this.save();
};

const User = mongoose.model("User", userSchema);

export default User;
