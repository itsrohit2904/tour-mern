const express = require("express");
const {
    getTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
    getupdateTour,
} = require("../controller/tourController");
const router = express.Router();

// @route GET /:id
// @desc Retrieve all tours for a specific user (identified by user ID)
router.route("/:id").get(getTours);

// @route GET /:id/:title
// @desc Retrieve a specific tour by user ID and tour title
router.route("/:id/:title").get(getTour);

// @route GET /:uid/update/:tid
// @desc Retrieve a specific tour for update by user ID and tour ID
router.route("/:uid/update/:tid").get(getupdateTour);

// @route POST /
// @desc Create a new tour
router.route("/").post(createTour);

// @route PUT /:id
// @desc Update an existing tour by its ID
router.route("/:id").put(updateTour);

// @route DELETE /:id
// @desc Delete an existing tour by its ID
router.route("/:id").delete(deleteTour);

// Export the router to be used in the application
module.exports = router;
