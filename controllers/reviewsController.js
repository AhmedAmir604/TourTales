import Review from "../models/reviewsModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
  getAllReviews,
} from "./factoryFunctions.js";

//Middleware
export const addUserTourId = (req, res, next) => {
  //Nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
//here is mine getReview and findReview
// export const addReview = catchAsync(async (req, res, next) => {
//   const user = await User.findById(req.user.id);
//   const tour = req.body.tour;
//   if (!user || !tour) {
//     return next(new ErrorHandler("Either user or tour not found", 404));
//   }
//   const review = await Review.create({
//     review: req.body.review,
//     rating: req.body.rating,
//     user: user,
//     tour: tour,
//   });

//   res.status(201).json({
//     status: "Success",
//     data: {
//       review,
//     },
//   });
// });

// export const getReviews = catchAsync(async (req, res, next) => {
//   let filter = {};
//   if (req.params.tourId) filter = { tour: req.params.tourId };
//   const reviews = await Review.find(filter);

//   res.status(200).json({
//     status: "Success",
//     count: reviews.length,
//     data: {
//       reviews,
//     },
//   });
// });

// export const findReview = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findById(req.params.tourId);
//   const review = await Review.findById(req.params.id);
//   if (!tour || !review) {
//     next(new ErrorHandler("Review not found for that tour!"), 404);
//   }

//   res.status(200).json({
//     status: "success",
//     data: {
//       review,
//     },
//   });
// });

export const deleteReview = deleteOne(Review);
export const addReview = createOne(Review);
export const updateReview = updateOne(Review);
export const getReview = getOne(Review);
// export const getAllReviews = getAll(Review);
export const getReviews = getAllReviews(Review);

//get/tour/id/reviews
//post/tour/id/reviews
//post/tour/id/review/id
