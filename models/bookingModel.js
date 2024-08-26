import mongoose from "mongoose";
import User from "./usersModel.js";
import Tour from "./tourModel.js";
import ErrorHandler from "../utils/appError.js";

const bookingSchema = new mongoose.Schema(
  {
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: [true, "A booking must belong to a Tour! :D"],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "booking must belong to a user! :)"],
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
    price: {
      type: Number,
      required: [true, "Need price for creating booking!"],
    },
    paid: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Not safe will change this asap :D
bookingSchema.methods.validateBooking = async function (tour, user) {
  if ((await User.findById(user)) && (await Tour.findById(tour))) {
    return true;
  }
  return false;
};
//yeah its part of the above :D
bookingSchema.pre("save", async function (next) {
  if (this.validateBooking) {
    next();
  }
  ErrorHandler("Cannot validate the credentials!", 400);
});

//You can do it but i have dont it in the lower statics func but better :D
//These are trigger in ahmed shafiq lang and query middleware in course language
// bookingSchema.pre(/^find/, function (next) {
//   this.populate("user");
//   next();
// });

bookingSchema.statics.getBookingsForUser = async function (userId) {
  return await this.find({ user: userId })
    .populate({
      path: "tour",
      select: "formatedDate startDates name imageCover summary ratingsAverage",
    })
    .populate({ path: "user", select: "name email" });
};

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
