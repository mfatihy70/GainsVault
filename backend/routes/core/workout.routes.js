import express from "express"
import {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,

  // Split related
  getSplitFromWorkoutId,
} from "../../controllers/core/workout.controller.js"

const router = express.Router()

router.get("/", getWorkouts)
router.get("/:id", getWorkoutById)
router.post("/", createWorkout)
router.put("/:id", updateWorkout)
router.delete("/:id", deleteWorkout)

router.get("/:workoutId/split", getSplitFromWorkoutId)
export default router
