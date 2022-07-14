import express from "express";
import {
  getWorkouts,
  getWorkoutById,
  deleteworkout,
  updateWorkout,
  createWorkout,
} from "../controller/workoutController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(getWorkouts).post(protect, admin, createWorkout);

router
  .route("/:id")
  .get(getWorkoutById)
  .delete(protect, admin, deleteworkout)
  .put(protect, admin, updateWorkout);

export default router;
