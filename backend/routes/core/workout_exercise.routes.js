import express from "express"
import {
  getWorkoutExercises,
  getWorkoutExerciseById,
  getExercisesForWorkout,
  createWorkoutExercise,
  updateWorkoutExercise,
  deleteWorkoutExercise,
} from "../../controllers/core/workout_exercise.controller.js"

const router = express.Router()

router.get("/", getWorkoutExercises)
router.get("/workout/:workoutId", getExercisesForWorkout)
router.get("/:id", getWorkoutExerciseById)
router.post("/", createWorkoutExercise)
router.put("/:id", updateWorkoutExercise)
router.delete("/:id", deleteWorkoutExercise)

export default router
