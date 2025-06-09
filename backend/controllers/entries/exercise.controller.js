import ExerciseEntry from "../../models/entries/exercise.model.js"

// Fetch all ExerciseEntries
export const getExerciseEntries = async (req, res) => {
  try {
    const exerciseEntries = await ExerciseEntry.findAll()
    res.json(exerciseEntries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Fetch an ExerciseEntry by ID
export const getExerciseEntryById = async (req, res) => {
  try {
    const exerciseEntry = await ExerciseEntry.findByPk(req.params.id)
    if (!exerciseEntry)
      return res.status(404).json({ message: "ExerciseEntry not found" })
    res.json(exerciseEntry)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create a new ExerciseEntry
export const createExerciseEntry = async (req, res) => {
  try {
    // TODO: replace with actual fields from the request body
    const { workout_entry_id, workout_exercise_id, exercise_id, performed_at } = req.body

    const newExerciseEntry = await ExerciseEntry.create({
      workout_entry_id,
      workout_exercise_id,
      exercise_id,
      performed_at,
    })

    res.status(201).json(newExerciseEntry)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update ExerciseEntry details
export const updateExerciseEntry = async (req, res) => {
  try {
    const [rowsUpdated, [updatedExerciseEntry]] = await ExerciseEntry.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })

    if (!rowsUpdated)
      return res.status(404).json({ message: "ExerciseEntry not found" })
    res.json(updatedExerciseEntry)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete an ExerciseEntry
export const deleteExerciseEntry = async (req, res) => {
  try {
    const deleted = await ExerciseEntry.destroy({
      where: { id: req.params.id },
    })

    if (!deleted)
      return res.status(404).json({ message: "ExerciseEntry not found" })

    res.json({ message: "ExerciseEntry deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
