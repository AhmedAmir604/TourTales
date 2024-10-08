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
import dotenv from "dotenv";
import { webhookCheckout } from "./controllers/bookingController.js";
dotenv.config({ path: "./config.env" });

const app = express();

//GLOBAL Middlewares

//Enabling cors for specific domains

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : "https://tt-pro.onrender.com",

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
        connectSrc: ["'self'", "https://tt-pro.onrender.com"], // Add this line
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

app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  webhookCheckout
);

//Body parser reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

//Cookie parser so we can have access to cookie easily cause we cant directly manipulate and access the cookie as it is sent in cookie = 'jwt=key' format on every request
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

//This is used to compress the response
app.use(compression());

//Testing middlewares
app.use((req, res, next) => {
  req.Time = new Date().toISOString();
  console.log(req.Time);
  next();
});

//This is rate limiter (limit request per) ip for OTP generation :D
export const otpRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 500, // Limit each IP to 5 OTP requests per hour
  message: "Too many OTP requests from this IP, please try again after an hour",
});

//Rotue for generating otp for password reset
app.use("/api/v1/users/forgot-password", otpRateLimiter);

//Routes
app.use("/api/v1/tours", toursRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/reviews", reviewsRoute);
app.use("/api/v1/booking", bookingRoute);

//For serving static files from bundeld
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
