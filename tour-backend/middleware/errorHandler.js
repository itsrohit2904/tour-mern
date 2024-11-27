const { constants } = require("../constants");

// Error handling middleware for centralized error responses
const errorHandler = (err, req, res, next) => {
    // Use the status code set in the response object or default to 500 (Internal Server Error)
    const statusCode = res.statusCode ? res.statusCode : 500;

    // Switch-case to handle different error types based on the status code
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            // Handle validation errors (e.g., missing or invalid inputs)
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackStrace: err.stack, // Include the stack trace for debugging
            });
            break;

        case constants.NOT_FOUND:
            // Handle resource not found errors
            res.json({
                title: "Not Found",
                message: err.message,
                stackStrace: err.stack,
            });
            break;

        case constants.UNAUTHORIZED:
            // Handle unauthorized access errors
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackStrace: err.stack,
            });
            break;

        case constants.SERVER_ERROR:
            // Handle internal server errors
            res.json({
                title: "Server Error",
                message: err.message,
                stackStrace: err.stack,
            });
            break;

        case constants.FORBIEDEN:
            // Handle forbidden access errors
            res.json({
                title: "Forbidden",
                message: err.message,
                stackStrace: err.stack,
            });
            break;

        default:
            // If no specific error type is matched, log a default message
            console.log("No error. All good!");
            break;
    }
};

module.exports = errorHandler;
