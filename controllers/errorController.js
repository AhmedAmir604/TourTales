import ErrorHandler from "../utils/appError.js";

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new ErrorHandler(message, 500);
};
const handleDuplicateErrorDB = (err) => {
  // Extract keyValue from the error response
  const keyValue = err.errorResponse?.keyValue || {};

  // Determine the type of duplicate error based on keyValue fields
  let duplicateField = "Your review for this tour";
  if (keyValue.name) {
    duplicateField = `Name "${keyValue.name}"`;
  } else if (keyValue.email) {
    duplicateField = `Email "${keyValue.email}"`;
  } else if (keyValue.review) {
    duplicateField = `Review "${keyValue.review}"`;
  }
  //I will add keyVlaue for booking to
  // Create the error message
  const message = `${duplicateField} already exists. Please try something different!`;
  // Return a new instance of ErrorHandler with the message and a 500 status code
  return new ErrorHandler(message, 500);
};
const handleValidationDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = errors.join(". ");
  return new ErrorHandler(message, 500);
};
const handleWebTokenError = () =>
  new ErrorHandler("Invalid Token Please login again!", 401);
const handleExpireToken = () => {
  new ErrorHandler("Your token has been expired please login again!", 401);
};

const errorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const errorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "Error",
      message: "Something went wrong!",
    });
  }
};

export const errorhandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";
  if (process.env.NODE_ENV === "development") {
    errorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    if (err.name === "CastError") error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateErrorDB(err);
    if (err.name === "ValidationError") error = handleValidationDB(err);
    if (err.name === "JsonWebTokenError") error = handleWebTokenError();
    if (err.name === "TokenExpiredError") error = handleExpireToken();

    // console.log(err.code);
    errorProd(error, res);
  }
};

export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
