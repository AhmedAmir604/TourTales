import express from "express";
import { protect, restrictsTo } from "../controllers/authController.js";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookings,
  getCheckoutSession,
  updateBooking,
} from "../controllers/bookingController.js";

export const bookingRoute = express.Router();

bookingRoute.use(protect);

bookingRoute.get("/checkout-session/:tourId", getCheckoutSession);

bookingRoute.route("/my-tours").get(getBookings).post(createBooking);

bookingRoute.use(restrictsTo("admin", "lead-guide"));

bookingRoute.get("/", getAllBookings);

bookingRoute
  .route("/my-tours/:tourId")
  .patch(updateBooking)
  .delete(deleteBooking);
