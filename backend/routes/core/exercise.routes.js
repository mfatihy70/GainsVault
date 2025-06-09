import express from "express"
import {
  getExercises,
  getExerciseById,
  createExercise,
  createMultipleExercises,
  updateExercise,
  updateMultipleExercises,
  deleteExercise,
} from "../../controllers/core/exercise.controller.js"

const router = express.Router()

router.get("/", getExercises)
router.get("/:id", getExerciseById)
router.post("/", createExercise)
router.post("/bulk", createMultipleExercises)
router.put("/:id", updateExercise)
router.put("/bulk", updateMultipleExercises)
router.delete("/:id", deleteExercise)

export default router
