import mongoose from "mongoose";
import crypto from "node:crypto";
import ErrorHandler from "../utils/appError.js";

const tokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Token must belong to a user!"],
    ref: "User",
    unique: true,
  },
  token: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
    expires: 60,
  },
});

tokenSchema.methods.generateOtp = function () {
  const otp = crypto.randomInt(1000, 9999);
  this.token = crypto.createHash("sha256").update(otp.toString()).digest("hex");
  this.save();
  return otp;
};

// Pre-find middleware to check if token has expired and manually delete it if needed
tokenSchema.post(/^find/, async function () {
  // Fetch the token based on the current query
  if (this.createdAt < Date.now() - 60000) {
    this.deleteOne();
    return next(new ErrorHandler("ERER", 404));
  }
  // Proceed if the token is valid
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;
