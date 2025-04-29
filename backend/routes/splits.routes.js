import express from "express";
import {
  getSplits,
  getSplitById,
  createSplit,
  updateSplit,
  deleteSplit,
  saveReps,
} from "../controllers/splits.controller.js";

const router = express.Router();

router.get("/", getSplits);
router.get("/:id", getSplitById);
router.post("/", createSplit);
router.put("/:id", updateSplit);
router.delete("/:id", deleteSplit);
router.post("/:id/reps", saveReps); // Save reps for a specific split

export default router;