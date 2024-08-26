import express from "express";
import path from "path";
import * as url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
import { toursRoute } from "./routes/toursRoutes.js";
import { usersRoute } from "./routes/userRoutes.js";
import { reviewsRoute } from "./routes/reviewsRoutes.js";
import morgan from "morgan";
import ErrorHandler from "./utils/appError.js";
import { errorhandler } from "./controllers/errorController.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import cors from "cors";
import cookieParser from "cookie-parser";
import { bookingRoute } from "./routes/bookingRoute.js";
import compression from "compression";

const app = express();

//GLOBAL Middlewares

// https://master--tourtales.netlify.app
app.use(
  cors({
    origin: "https://tourtales-production.onrender.com",
    credentials: true,
  })
);

//Set HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://js.stripe.com"],
        frameSrc: ["'self'", "https://js.stripe.com"], // Add this line
        connectSrc: ["'self'", "https://tourtales-production.onrender.com"], // Add this line
      },
    },
  })
);

//Development Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//RateLimiter rates the amount of requests per ip
const limit = rateLimit({
  limit: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP try again after 1 hour",
});

app.use("/api", limit);

//Body parser reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

//Cookie parser so we can have access to cookie on every request
app.use(cookieParser());

//Use this for data sanitization fight noSQL injections :(
app.use(mongoSanitize());

//Remove XSS attempt removing html tags :D
app.use(xss());

//it remove parameters pollutants
app.use(
  hpp({
    whitelist: [
      "price",
      "duration",
      "ratingsAverage",
      "difficulty",
      "maxGroupSize",
      "ratingsQuantity",
    ],
  })
);

//This is used to compress the res
app.use(compression());

//Testing middlewares
app.use((req, res, next) => {
  req.Time = new Date().toISOString();
  console.log(req.Time);
  next();
});

//Routes
// app.use("/api/v1/tours", toursRoute);
// app.use("/api/v1/users", usersRoute);
// app.use("/api/v1/reviews", reviewsRoute);
// app.use("/api/v1/booking", bookingRoute);

// For Production
app.use("/tours", toursRoute);
app.use("/users", usersRoute);
app.use("/reviews", reviewsRoute);
app.use("/booking", bookingRoute);

//For Production
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);

//TO handle 404 for all routes :D
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Cannt find ${req.originalUrl} Route!`, 404));
});

app.use(errorhandler);

export default app;
