const asyncHandler = require("express-async-handler");
const Tour = require("../models/tourModel");

// @desc Get all hotels
// @route GET /
// @access Public
const getTours = asyncHandler(async (req, res) => {
    // Fetch all tours for the specific user (based on Uid)
    const tour = await Tour.find({ Uid: req.params.id });
    res.status(200).json(tour);
});

// @desc Get a single hotel by title and user ID
// @route GET /:id/:title
// @access Public
const getTour = asyncHandler(async (req, res) => {
    // Find a specific tour by title and user ID
    const tour = await Tour.find({ title: req.params.title, Uid: req.params.id });
    if (!tour) {
        res.status(404);
        throw new Error("Tour not found");
    }
    res.status(200).json(tour);
});

// @desc Get a single hotel by tour ID and user ID
// @route GET /:uid/:tid
// @access Public
const getupdateTour = asyncHandler(async (req, res) => {
    // Fetch a specific tour by ID and user ID
    const tour = await Tour.find({ _id: req.params.tid, Uid: req.params.uid });
    if (!tour) {
        res.status(404);
        throw new Error("Tour not found");
    }
    res.status(200).json(tour);
});

// @desc Create a new hotel/tour
// @route POST /
// @access Public
const createTour = asyncHandler(async (req, res) => {
    console.log("Received POST request with data: ", req.body);

    const { title, description, pick_up, meeting_point, drop_off, duration, duration_unit, Uid } = req.body;

    // Validate input fields
    if (!title || !description || !pick_up || !meeting_point || !drop_off || !duration || !duration_unit || !Uid) {
        res.status(400);
        throw new Error("All fields are mandatory.");
    }

    // Create and save a new tour
    try {
        const tour = await Tour.create({
            Uid,
            title,
            description,
            pick_up,
            meeting_point,
            drop_off,
            duration,
            duration_unit,
        });

        res.status(201).json({
            success: true,
            message: "Tour created successfully",
            data: tour,
        });
    } catch (error) {
        console.error("Error creating tour: ", error);
        res.status(500);
        throw new Error("Failed to create tour");
    }
});

// @desc Update an existing hotel/tour
// @route PUT /:id
// @access Public
const updateTour = asyncHandler(async (req, res) => {
    // Check if the tour exists
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
        res.status(404);
        throw new Error("Tour not found");
    }

    // Update the tour with new data
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTour);
});

// @desc Delete a hotel/tour
// @route DELETE /:id
// @access Public
const deleteTour = asyncHandler(async (req, res) => {
    // Check if the tour exists
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
        res.status(404);
        throw new Error("Tour not found");
    }

    // Delete the tour
    await Tour.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true, message: "Tour deleted", data: tour });
});

module.exports = { getTours, getTour, createTour, updateTour, deleteTour, getupdateTour };
