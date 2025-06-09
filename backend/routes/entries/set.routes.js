import {
  getSetEntries,
  getSetEntryById,
  createSetEntry,
  updateSetEntry,
  deleteSetEntry,
} from "../../controllers/entries/set.controller.js"

const router = express.Router()

router.get("/", getSetEntries)
router.get("/:id", getSetEntryById)
router.post("/", createSetEntry)
router.put("/:id", updateSetEntry)
router.delete("/:id", deleteSetEntry)

export default router
