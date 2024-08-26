import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({ path: "./config.env" });
import app from "./app.js";

process.on("unhandledRejection", (err) => {
  console.log(err.message);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log(err.message);
  console.log("UNCAUGHT EXCEPTION OCCURED");
  process.exit(0);
});

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose.connect(DB).then((/*obj*/) => {
  // console.log(obj.connections);
  console.log("Connection with DataBase Established Successfully!");
});

// const testTour = new Tour({
//   name: "ahmed",
//   price: 199,
//   rating: 4.4,
// });

// testTour
//   .save()
//   .then((c) => console.log(c))
//   .catch((e) => {
//     console.log(`Error exist :( ${e}`);
//   });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("it is running :D");
});
