import {
  getWorkoutEntries,
  getWorkoutEntriesById,
  createWorkoutEntry,
  updateWorkoutEntry,
  deleteWorkoutEntry,
} from "../../controllers/entries/workout.controller.js"

const router = express.Router()

router.get("/", getWorkoutEntries)
router.get("/:id", getWorkoutEntriesById)
router.post("/", createWorkoutEntry)
router.put("/:id", updateWorkoutEntry)
router.delete("/:id", deleteWorkoutEntry)

export default router
