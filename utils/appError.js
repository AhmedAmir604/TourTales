class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    this.status = `${
      String(this.statusCode).startsWith("4") ? "Fail" : "Error"
    }`;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);

    //Nice function to see error and call stack tell error occured :D
    // console.log(this.stack);
  }
}

export default ErrorHandler;
