import dotenv from "dotenv";
import fs from "fs";
import mongoose from "mongoose";
dotenv.config({ path: "./config.env" });
import * as url from "url";
import Tour from "./models/tourModel.js";
import User from "./models/usersModel.js";
import Review from "./models/reviewsModel.js";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose.connect(DB).then((c) => {
  //   console.log(c.connections);
  console.log("Connection with DataBase Established Successfully!");
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`, `utf-8`)
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`, `utf-8`)
);
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/reviews.json`, `utf-8`)
);

//This script i have created to add participants soldOut and Date as an object in startDates :)
const updatedTours = tours.map((tour) => ({
  ...tour, // Keep other properties of the tour unchanged
  startDates: tour.startDates.map((dateString) => ({
    Date: new Date(dateString),
    participants: 0, // Initialize with 0 participants
    soldOut: false, // Initialize with false
  })),
}));

const importData = async () => {
  try {
    // await Tour.create(updatedTours, { validateBeforeSave: false });
    await User.create(users, { validateBeforeSave: false });
    // await Review.create(reviews);
    console.log("Imported");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    // await Tour.deleteMany();
    await User.deleteMany();
    // await Review.deleteMany();
    console.log("Deleted!");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === "import") {
  importData();
} else if (process.argv[2] === "delete") {
  deleteData();
} else {
  console.log(
    "Please specify 'import' or 'delete' as a command-line argument."
  );
  process.exit(1);
}

console.log(process.argv);
