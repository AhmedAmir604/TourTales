import express from "express";
import {
  getAllTours,
  addATour,
  deleteTour,
  findATour,
  // idCheck,
  bodyCheck,
  updateTour,
  aliasTop5Tours,
  getTourStats,
  monthlyPlan,
  getToursWithin,
  getDistances,
  uploadTourImages,
  resizeTourImages,
} from "../controllers/toursController.js";
import {
  isLoggedIn,
  isLoggedInClient,
  protect,
  restrictsTo,
} from "../controllers/authController.js";
import { reviewsRoute } from "./reviewsRoutes.js";

export const toursRoute = express.Router();

// toursRoute.param("id", idCheck);

//This middleware is used to check if the user is log in display user profile else continue :D
// toursRoute.use(isLoggedIn);

//Here we redirect to Reviews Route using this middleware and use mergePramas in reviews router to access the variable :)
toursRoute.use("/:tourId/reviews", reviewsRoute);

//Open routes for public to access :)
toursRoute.route("/top-5-tours").get(aliasTop5Tours, getAllTours);
toursRoute.route("/tours-stats").get(getTourStats);

toursRoute.route("/").get(isLoggedInClient, getAllTours);
toursRoute.route("/:id").get(findATour);

//Protected Routes for loggedIn and restricted role :)
toursRoute.use(protect);

toursRoute
  .route("/tours-within/:distance/center/:latlng/:unit")
  .get(getToursWithin);
toursRoute.route("/distances/:latlng/unit/:unit").get(getDistances);

toursRoute.use(restrictsTo("admin", "tour-lead"));

toursRoute.route("/monthly-plan/:year").get(monthlyPlan);
toursRoute.route("/").post(bodyCheck, addATour);
toursRoute
  .route(`/:id`)
  .delete(protect, deleteTour)
  .patch(uploadTourImages, resizeTourImages, updateTour);
