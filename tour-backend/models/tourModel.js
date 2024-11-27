const mongoose = require("mongoose");

// Define the schema for the Tour model
const tourSchema = mongoose.Schema(
    {
        // User ID associated with the tour
        Uid: {
            type: String,
            required: true, // This field is mandatory
        },
        // Title of the tour
        title: {
            type: String,
            required: [true, "Please add the title"], // Custom error message for validation
        },
        // Description of the tour
        description: {
            type: String,
            required: [true, "Please add the description"],
        },
        // Pick-up location for the tour
        pick_up: {
            type: String,
            required: [true, "Please add the pick-up location"],
        },
        // Meeting point for the tour
        meeting_point: {
            type: String,
            required: [true, "Please add the meeting point"],
        },
        // Drop-off location for the tour
        drop_off: {
            type: String,
            required: [true, "Please add the drop-off location"],
        },
        // Duration of the tour (numeric value)
        duration: {
            type: Number,
            required: [true, "Please add the duration"],
        },
        // Unit of the tour duration (e.g., hours, days)
        duration_unit: {
            type: String,
            required: [true, "Please add the duration unit"],
        },
    },
    {
        timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
    }
);

// Export the Tour model based on the schema
module.exports = mongoose.model("Tours", tourSchema);
