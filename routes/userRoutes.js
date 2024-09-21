import express from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  deleteMe,
  updateUserAdmin,
  getME,
  uploadUserPhoto,
  resizeUserPhoto,
  addLikedTours,
  getBookmarked,
} from "../controllers/usersController.js";
import {
  forgotPassword,
  generateOtp,
  generateOtpLogin,
  isLoggedIn,
  login,
  logout,
  protect,
  resetPassword,
  resetPasswordOtp,
  restrictsTo,
  signup,
  updatePassword,
  verifyOtp,
  verifyOtpLogin,
} from "../controllers/authController.js";
import { getLikedTours } from "../controllers/usersController.js";
import { getBookings } from "../controllers/bookingController.js";
import { reviewsRoute } from "./reviewsRoutes.js";

export const usersRoute = express.Router();

usersRoute.use("/reviews", reviewsRoute);

usersRoute.post("/signup", signup);
usersRoute.post("/login", login, generateOtpLogin);
//2fa implementation

usersRoute.post("/verify-otp", verifyOtpLogin);

//I have implemented both methods to reset Password
//1: Via reset link to email
//2: Via OTP to the email

//This is reset Link method
usersRoute.post("/forgotPassword", forgotPassword);
usersRoute.patch("/resetPassword/:token", resetPassword);

//This is OTP Method

usersRoute.post("/forgot-password", generateOtp);
usersRoute.post("/reset-password", verifyOtp);
usersRoute.patch("/reset-password/:token", resetPasswordOtp);

//Here we use isLoggedIn to check if the user is login or not :D its an addition by me..
usersRoute.get("/isLoggedIn", isLoggedIn);

//Here we use protect as a middleware for further routes :D
usersRoute.use(protect);

//return complete bookmarked tours not only ids but complete
usersRoute.route("/liked-tours").get(getLikedTours).patch(addLikedTours);

//Only return ids for checking if to show filled bookmark icon on front-end
usersRoute.route("/bookmarked").get(getBookmarked);

//Here i am trying to apply logout
usersRoute.get("/logout", logout);

usersRoute.patch("/updatePassword", updatePassword);
usersRoute.patch(
  "/updateMyDetails",
  uploadUserPhoto,
  resizeUserPhoto,
  updateUser
);
usersRoute.delete("/deleteMe", deleteMe);
usersRoute.route("/me").get(getME, getUser);
usersRoute.route("/:id/bookings").get(getBookings);

//Here we use restrictsTo as a middleware for further routes :D

usersRoute.use(restrictsTo("admin"));

usersRoute.route("/").get(getAllUsers);
usersRoute.route("/:id").get(getUser).delete(deleteUser).patch(updateUserAdmin);

//Remeber if you next() from a route it moves to only next middleware stack
