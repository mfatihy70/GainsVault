import express from "express"
import {
  getWorkoutExercises,
  getWorkoutExerciseById,
  getExercisesForWorkout,
  createWorkoutExercise,
  updateWorkoutExercise,
  deleteWorkoutExercise,
  deleteWorkoutExercisesByWorkoutId,
} from "../../controllers/core/workout_exercise.controller.js"

const router = express.Router()

router.get("/", getWorkoutExercises)
router.get("/workout/:workoutId", getExercisesForWorkout)
router.get("/:id", getWorkoutExerciseById)
router.post("/", createWorkoutExercise)
router.put("/:id", updateWorkoutExercise)
router.delete("/:id", deleteWorkoutExercise)
router.delete("/workout/:workoutId", deleteWorkoutExercisesByWorkoutId)

export default router
