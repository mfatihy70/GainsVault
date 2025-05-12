import express from "express"
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  trackWeight,
  getWeight,
  deleteWeight,
} from "../controllers/user.controller.js"

const router = express.Router()

router.get("/", getUsers)
router.get("/:id", getUserById)
router.post("/register", registerUser)
router.post("/login", loginUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

// Weight tracking routes
router.get("/:id/weight", getWeight)
router.post("/:id/weight", trackWeight)
router.delete("/:id/weight/:index", deleteWeight)

export default router
