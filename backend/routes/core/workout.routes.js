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
import { authUser, tryAuthUser } from "../../middleware/auth.middleware.js"

const router = express.Router()

router.get("/", tryAuthUser, getWorkouts)
router.get("/:id", tryAuthUser, getWorkoutById)
router.post("/", authUser, createWorkout)
router.put("/:id", authUser, updateWorkout)
router.delete("/:id", authUser, deleteWorkout)

router.get("/:workoutId/split", getSplitFromWorkoutId)
export default router
