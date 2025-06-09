import express from "express"
import {
  getExerciseEntries,
  getExerciseEntryById,
  createExerciseEntry,
  updateExerciseEntry,
  deleteExerciseEntry,
} from "../../controllers/entries/exerciseEntry.controller.js"

const router = express.Router()

router.get("/", getExerciseEntries)
router.get("/:id", getExerciseEntryById)
router.post("/", createExerciseEntry)
router.put("/:id", updateExerciseEntry)
router.delete("/:id", deleteExerciseEntry)

export default router
