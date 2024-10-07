import express from "express";
import {
  addReview,
  addUserTourId,
  deleteReview,
  getMyReview,
  getReview,
  getReviews,
  IfUserBookedTour,
  updateReview,
} from "../controllers/reviewsController.js";
import { protect, restrictsTo } from "../controllers/authController.js";

export const reviewsRoute = express.Router({ mergeParams: true });
//tours/tourId/reviews it starts from here :)

reviewsRoute
  .route("/")
  .get(getReviews)
  .post(protect, restrictsTo("user", "admin"), addUserTourId, addReview);
reviewsRoute.use(protect);

reviewsRoute.route("/my-reviews").get(getMyReview);

reviewsRoute
  .route("/:id")
  .get(getReview)
  .delete(restrictsTo("user", "admin"), deleteReview)
  .patch(restrictsTo("user", "admin"), updateReview);
