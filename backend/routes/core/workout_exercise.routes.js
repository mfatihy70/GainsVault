import express from "express"
import {
  getWorkoutExercises,
  getWorkoutExerciseById,
  createWorkoutExercise,
  updateWorkoutExercise,
  deleteWorkoutExercise,
} from "../../controllers/core/workout_exercise.controller.js"

const router = express.Router()

// Fetch all exercises for a specific workout
router.get("/workout/:workoutId", getWorkoutExercises)

router.get("/", getWorkoutExercises)
router.get("/:id", getWorkoutExerciseById)
router.post("/", createWorkoutExercise)
router.put("/:id", updateWorkoutExercise)
router.delete("/:id", deleteWorkoutExercise)

export default router
