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
  isLoggedIn,
  login,
  logout,
  protect,
  resetPassword,
  restrictsTo,
  signup,
  updatePassword,
} from "../controllers/authController.js";
import { getLikedTours } from "../controllers/usersController.js";
import { getBookings } from "../controllers/bookingController.js";

export const usersRoute = express.Router();

usersRoute.post("/signup", signup);
usersRoute.post("/login", login);
usersRoute.post("/forgotPassword", forgotPassword);
usersRoute.patch("/resetPassword/:token", resetPassword);

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
