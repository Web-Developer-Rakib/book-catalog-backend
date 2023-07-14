import { ErrorRequestHandler } from "express";

// Custom error classes
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

class CastError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CastError";
  }
}

// Global error handling middleware
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Determine the error type and set appropriate error message and status code
  let message = "Internal Server Error";
  let errorType = "InternalError";
  let statusCode = 500;

  if (err instanceof ValidationError) {
    message = "Validation Error";
    errorType = "ValidationError";
    statusCode = 400;
  } else if (err instanceof CastError) {
    message = "Cast Error";
    errorType = "CastError";
    statusCode = 400;
  } else if (err.code === 11000) {
    message = "Duplicate Entry";
    errorType = "DuplicateEntry";
    statusCode = 400;
  }

  // Create the error response object
  const errorResponse = {
    success: false,
    message: `${errorType} - ${message}`,
    errorMessages: [{ path: "", message: err.message }],
    stack: err.stack,
  };

  // Send the error response with appropriate status code
  res.status(statusCode).json(errorResponse);
};
