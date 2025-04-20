import express from "express"
import {
  getProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profile.controller.js"

const router = express.Router()

router.get("/", getProfile)
router.put("/", updateProfile)
router.delete("/", deleteProfile)

export default router
