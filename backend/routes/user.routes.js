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
} from "../controllers/user.controller.js"

const router = express.Router()

router.get("/", getUsers)
router.get("/:id", getUserById)
router.post("/register", registerUser)
router.post("/login", loginUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)
router.get("/:id/weight", getWeight)
router.post("/:id/weight", trackWeight)

export default router
