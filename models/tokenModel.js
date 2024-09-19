import mongoose from "mongoose";
import crypto from "node:crypto";

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
    expires: "1m", //1 min
  },
});

tokenSchema.methods.generateOtp = function () {
  const otp = crypto.randomInt(1000, 9999);
  this.token = crypto.createHash("sha256").update(otp.toString()).digest("hex");
  this.save();
  return otp;
};

const Token = mongoose.model("Token", tokenSchema);

export default Token;
