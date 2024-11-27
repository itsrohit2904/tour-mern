// Import swagger-autogen to generate Swagger documentation automatically
const swaggerAutogen = require('swagger-autogen')();

// Define the basic API documentation metadata
const doc = {
    info: {
        title: 'My API', // API title
        description: 'API for managing tours and users', // Short description of the API
    },
    host: 'tour-backend-kuvb.onrender.com', // Host URL for the deployed API
    schemes: ['https'], // Use HTTPS for secure access
};

// Specify the output file where the generated Swagger JSON will be saved
const outputFile = './swagger-output.json';

// List of route files to be included in the Swagger documentation
// These route files should include the routes to be documented (tourRouter.js, userRouter.js)
const routes = ['./routers/tourRouter.js', './routers/userRouter.js'];

// Generate Swagger documentation and save it to the output file
swaggerAutogen(outputFile, routes, doc);
