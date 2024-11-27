const mongoose = require("mongoose");

// Define the schema for the User model
const userSchema = mongoose.Schema(
    {
        // User's name
        username: {
            type: String,
            required: [true, "Please add the user name"], // Field is mandatory with a custom error message
        },
        // User's email address
        email: {
            type: String,
            required: [true, "Please add the user email"], // Field is mandatory with a custom error message
            unique: [true, "Email address already exists"], // Ensures email is unique in the database
        },
        // User's password (hashed when stored)
        password: {
            type: String,
            required: [true, "Please add the user password"], // Field is mandatory with a custom error message
        },
    },
    {
        timestamps: true, // Automatically add `createdAt` and `updatedAt` fields to track record changes
    }
);

// Export the User model based on the schema
module.exports = mongoose.model("user", userSchema);
