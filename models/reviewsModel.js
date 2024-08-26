//Reviews / rating/ review of tour / review of which user  / created at

import mongoose from "mongoose";
import Tour from "./tourModel.js";

const reviewsSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Please enter the review "],
    },
    rating: {
      type: Number,
      required: [true, "rating is required to continue"],
      min: [1, "Review must be between 1 and 5"],
      max: [5, "Review must be between 1 and 5"],
      default: 4,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A review must belong to a user!"],
    },

    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: [true, "A review must belong to a tour!"],
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

reviewsSchema.index({ user: 1, tour: 1 }, { unique: true });

//Here we use static function which is used on Model and is called
//by query middleware and here then we use pipelines to select
//data according to conditions
reviewsSchema.statics.getRatingsAverageCount = async (tourId) => {
  const reviews = await Review.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: "$tour",
        ratingsAvg: { $avg: "$rating" },
        ratingsCount: { $sum: 1 },
      },
    },
  ]);
  if (reviews.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: reviews[0].ratingsAvg,
      ratingsQuantity: reviews[0].ratingsCount,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: 4.5,
      ratingsQuantity: 0,
    });
  }
};

//Query Middleware or Triggers in language of Ahmed Shafiq

reviewsSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: "user",
  //   select: "name",
  // }).populate({
  //   path: "tour",
  //   select: "name photo",
  // });

  this.populate({
    path: "user",
    select: "name photo",
  });

  next();
});

//This is the middleware used in static func in post there
//  is no access of next as it is already one of the lasts :D
reviewsSchema.post("save", function () {
  this.constructor.getRatingsAverageCount(this.tour);
});

//here this.model.findOne(query) means this = document model
//  means Model(Review) and here this.getQuery()=query in the doc
//When we use query using doc query is completely exec and finished while with model it presist

reviewsSchema.pre(/^findOneAnd/, async function (next) {
  this.doc = await this.model.findOne(this.getQuery()); // Change this line
  next();
});

reviewsSchema.post(/^findOneAnd/, async function () {
  await this.doc.constructor.getRatingsAverageCount(this.doc.tour);
});

const Review = mongoose.model("Review", reviewsSchema);

export default Review;
