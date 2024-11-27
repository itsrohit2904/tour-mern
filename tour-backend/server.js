const express = require("express");
const connectDb = require("./mongodb"); // Import function to connect to MongoDB
const errorHandler = require("./middleware/errorHandler"); // Import custom error handler middleware
const cors = require('cors'); // Import CORS middleware for cross-origin requests
const dotenv = require("dotenv").config(); // Load environment variables from .env file
const swaggerjsdoc = require("swagger-jsdoc"); // Import Swagger JSDoc for API documentation
const swaggerui = require("swagger-ui-express"); // Import Swagger UI for displaying documentation
const swaggerDocument = require("./swagger-output.json"); // Import the Swagger JSON output

// Connect to the database
connectDb();

// Initialize Express app
const app = express();

// Define the port to listen on, default to 3001 if not specified in the environment
const port = process.env.PORT || 3001;

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming requests with JSON payload

// Define routes for different resources
app.use("/tours", require("./routers/tourRouter")); // Tours routes
app.use("/users", require("./routers/userRouter")); // Users routes

// Use the error handler middleware for handling errors
app.use(errorHandler);

// Setup Swagger UI for API documentation
app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerDocument));

// Start the server and listen on the defined port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
