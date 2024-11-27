const mongoose = require("mongoose");

// Function to establish a connection to the MongoDB database
const connectDb = async () => {
    try {
        // Attempt to connect to the database using the provided connection string
        const connect = await mongoose.connect(
            "mongodb+srv://admin:admin@cluster0.pvc7p.mongodb.net/tour_backend?retryWrites=true&w=majority&appName=Cluster0"
        );

        // Log a success message with the database host and name
        console.log(
            "Database connected",
            connect.connection.host,
            connect.connection.name
        );
    } catch (error) {
        // Log any error that occurs during the connection attempt
        console.log(error);

        // Exit the process with failure if connection fails
        process.exit(1); // 1 indicates an error occurred
    }
};

// Export the database connection function for use in the application
module.exports = connectDb;
