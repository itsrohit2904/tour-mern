// Define HTTP status codes used in the application for various error types
exports.constants = {
    // Validation error: Client-side error, typically due to incorrect input
    VALIDATION_ERROR: 400,

    // Unauthorized: User authentication is required or failed
    UNAUTHORIZED: 401,

    // Forbidden: User is authenticated but does not have permission to access the resource
    FORBIDDEN: 403,

    // Not Found: The requested resource could not be found
    NOT_FOUND: 404,

    // Internal Server Error: A generic server-side error occurred
    SERVER_ERROR: 500,
};
