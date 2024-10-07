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
    default: Date.now() + 6000,
    required: true,
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

tokenSchema.pre("save", async function (next) {
  const currentTime = Date.now();
  const doc = await this.constructor.find({
    createdAt: { $lte: currentTime },
  });
  if (doc.lenght > 1) {
    const doc = await this.constructor.find({
      createdAt: { $lte: currentTime },
    });
  }
  next();
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;
