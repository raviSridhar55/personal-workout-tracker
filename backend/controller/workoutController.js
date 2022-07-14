import asyncHandler from "express-async-handler";
import Workouts from "../Models/workoutModel.js";

// @desc    Fetch all workouts
// @route   GET /api/workouts
// @access  Public

const getWorkouts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const workouts = await Workouts.find({ ...keyword });
  res.json(workouts);
});

// @desc    Fetch a single workout
// @route   GET /api/workouts/:id
// @access  Public

const getWorkoutById = asyncHandler(async (req, res) => {
  const workout = await Workouts.findById(req.params.id);

  if (workout) {
    res.json(workout);
  } else {
    res.status(404);
    throw new Error("Not Found");
  }
});

// @desc    Delete a workout
// @route   DELETE /api/workouts/:id
// @access  Pricate/Admin

const deleteworkout = asyncHandler(async (req, res) => {
  const workout = await Workouts.findById(req.params.id);

  if (workout) {
    await workout.remove();
    res.json({ message: " workout removed" });
  } else {
    res.status(404);
    throw new Error("Not Found");
  }
});

// @desc    Create a workout
// @route   POST /api/workouts/:id
// @access  Pricate/Admin
const createWorkout = asyncHandler(async (req, res) => {
  const workout = new Workouts({
    user: req.user.id,
    name: "sample name",
    description: "sample desc",
    seller: "sample seller",
    category: "sample category",
    price: 0,
    rating: 5,
    result: "sample result",
  });
  const createdWorkout = await workout.save();
  res.status(201).json(createdWorkout);
});

// @desc    Update a workout
// @route   PUT /api/workouts/:id
// @access  Pricate/Admin
const updateWorkout = asyncHandler(async (req, res) => {
  const { name, category, seller, description, price, rating, result } =
    req.body;

  const workout = await Workouts.findById(req.params.id);

  if (workout) {
    workout.name = name;
    workout.description = description;
    workout.category = category;
    workout.seller = seller;
    workout.price = price;
    workout.rating = rating;
    workout.result = result;

    const updatedWorkout = await workout.save();
    res.json(updatedWorkout);
  } else {
    res.status(404);
    throw new error("workout not found");
  }
});
export {
  getWorkouts,
  getWorkoutById,
  deleteworkout,
  createWorkout,
  updateWorkout,
};
