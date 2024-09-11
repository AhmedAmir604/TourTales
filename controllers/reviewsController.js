import Review from "../models/reviewsModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
  getAllReviews,
} from "./factoryFunctions.js";
import Booking from "../models/bookingModel.js";
import ErrorHandler from "../utils/appError.js";
import { catchAsync } from "./errorController.js";

//Middleware
export const addUserTourId = (req, res, next) => {
  //Nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  console.log(req.params.tourId);
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

//Here checking before giving review if the user has booked the tour

export const IfUserBookedTour = catchAsync(async (req, res, next) => {
  const tourId = req.body.tour;

  const booking = await Booking.find({ user: req.body.user }).select("tour");
  const tours = booking.map((el) => el.tour.toString());
  // console.log(booking);
  console.log(tours);
  console.log(tourId);

  if (!tours.includes(tourId)) {
    return next(
      new ErrorHandler(
        "Cant add review for the Tour you have not take :(!",
        400
      )
    );
  }
  next();
});

export const deleteReview = deleteOne(Review);
export const addReview = createOne(Review);
export const updateReview = updateOne(Review);
export const getReview = getOne(Review);
// export const getAllReviews = getAll(Review);
export const getReviews = getAllReviews(Review);

//get/tour/id/reviews
//post/tour/id/reviews
//post/tour/id/review/id
