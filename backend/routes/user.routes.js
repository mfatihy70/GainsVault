import express from "express"
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  // Weight tracking
  trackWeight,
  getWeights,
  deleteWeight,
  // Workout tracking
  getUserWorkoutEntries,
  getUserWorkoutEntryById,
} from "../controllers/user.controller.js"

const router = express.Router()

router.get("/", getUsers)
router.get("/:id", getUserById)
router.post("/register", registerUser)
router.post("/login", loginUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

// Weight tracking routes
router.get("/:id/weight", getWeights)
router.post("/:id/weight", trackWeight)
router.delete("/:id/weight/:index", deleteWeight)

// Workout tracking routes
router.get("/:id/workout", getUserWorkoutEntries)
router.get("/:id/workout/:workoutId", getUserWorkoutEntryById)

export default router
