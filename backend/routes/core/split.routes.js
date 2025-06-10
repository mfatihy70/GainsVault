import express from "express"
import {
  getSplits,
  getSplitById,
  createSplit,
  updateSplit,
  deleteSplit,
  getWorkoutsForSplit,
} from "../../controllers/core/split.controller.js"

const router = express.Router()

router.get("/", getSplits)
router.get("/:id", getSplitById)
router.post("/", createSplit)
router.put("/:id", updateSplit)
router.delete("/:id", deleteSplit)
router.get("/:id/workouts", getWorkoutsForSplit)

export default router
