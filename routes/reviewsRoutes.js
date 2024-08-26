import express from "express";
import {
  addReview,
  addUserTourId,
  deleteReview,
  getReview,
  getReviews,
  updateReview,
} from "../controllers/reviewsController.js";
import { protect, restrictsTo } from "../controllers/authController.js";

export const reviewsRoute = express.Router({ mergeParams: true });
//tours/tourId/reviews it starts from here :)

reviewsRoute
  .route("/")
  .get(getReviews)
  .post(protect, restrictsTo("user"), addUserTourId, addReview);
reviewsRoute.use(protect);

reviewsRoute
  .route("/:id")
  .get(getReview)
  .delete(restrictsTo("user", "admin"), deleteReview)
  .patch(restrictsTo("user", "admin"), updateReview);
