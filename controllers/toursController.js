// import fs from "fs";
import * as url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
import Tour from "../models/tourModel.js";
import { APIFeatures } from "../utils/apiFeatures.js";
import { catchAsync } from "./errorController.js";
import ErrorHandler from "../utils/appError.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./factoryFunctions.js";
import multer from "multer";
import sharp from "sharp";

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// export const idCheck = (req, res, next, val) => {
//   const id = val * 1;
//   const check = tours.find((e) => e.id === id);
//   if (!check) {
//     return res.status(404).json({
//       status: "Failed",
//       detilas: "Not Found!",
//     });
//   }
//   next();
// };

export const aliasTop5Tours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage price";
  next();
};

export const bodyCheck = (req, res, next) => {
  const newTour = req.body;
  if (!newTour.name || !newTour.price) {
    return res.status(400).json({
      status: "failed",
      description: "Name and Price not found!",
    });
  }
  next();
};

//Pipelines
export const monthlyPlan = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${req.params.year}-1-1`),
          $lte: new Date(`${req.params.year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        numOfTours: { $sum: 1 },
        NameOfTheTours: { $push: "$name" },
      },
    },
    {
      $sort: {
        numOfTours: -1,
      },
    },
    {
      $addFields: {
        month: "$_id",
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);
  const date = new Date(`${req.params.year}-1-01`);
  res.status(200).json({
    status: "Success",
    data: stats,
  });
});

export const getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: "$difficulty",
        numTours: { $sum: 1 },
        avgPrice: { $avg: "$price" },
        avgRating: { $avg: "$ratingsAverage" },
        numRatings: { $sum: "$ratingsAverage" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $sort: {
        numTours: -1,
      },
    },
  ]);
  res.status(200).json({
    status: "Success",
    data: stats,
  });
});

//end above

export const getToursWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, long] = latlng.split(",");

  if (!lat || !long) {
    return next(
      new ErrorHandler("Please provide latitude and longitude :)"),
      400
    );
  }
  const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;
  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[long, lat], radius] } },
  });

  res.status(200).json({
    status: "Success",
    data: {
      tours,
    },
  });
});

export const getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const mul = unit === "mi" ? 0.000621371 : 0.001;
  const [lat, long] = latlng.split(",");
  if (!lat || !long) {
    return next(
      new ErrorHandler("Please provide latitude and longitude :)"),
      400
    );
  }
  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [long * 1, lat * 1],
        },
        distanceField: "distance",
        distanceMultiplier: mul,
        spherical: true,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "Success",
    data: {
      distances,
    },
  });
});

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  file.mimetype.startsWith("image")
    ? cb(null, true)
    : cb(new ErrorHandler("Please only upload image!", 400), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadTourImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

//upload.array() here it is used for multiple images and it make req.files
//upload.single('photo') for single photo it make req.file now plural (s)
//upload.fields([]) for multiple fields of images it also make files

export const resizeTourImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();

  //resize and saveImage function
  const resizeAndSaveImage = async (buffer, filename) => {
    return sharp(buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`../client/public/tours/${filename}`);
  };
  //name cover image and Resize cover image
  req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
  await resizeAndSaveImage(req.files.imageCover[0].buffer, req.body.imageCover);

  // Resize other images
  req.body.images = await Promise.all(
    req.files.images.map(async (image, index) => {
      const imageFilename = `tour-${req.params.id}-${Date.now()}-${
        index + 1
      }.jpeg`;
      await resizeAndSaveImage(image.buffer, imageFilename);
      return imageFilename;
    })
  );
  next();
});

export const getAllTours = getAll(Tour);
export const findATour = getOne(Tour, { path: "reviews" });
export const deleteTour = deleteOne(Tour);
export const addATour = createOne(Tour);
export const updateTour = updateOne(Tour);
