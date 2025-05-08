import Exercise from "../../models/core/exercise.model.js"

// Fetch all exercises
export const getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.findAll()
    res.json(exercises)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Fetch an exercise by ID
export const getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findByPk(req.params.id)
    if (!exercise)
      return res.status(404).json({ message: "Exercise not found" })
    res.json(exercise)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create a new exercise
export const createExercise = async (req, res) => {
  try {
    const { name, primary, secondary, equipment } = req.body
    const newExercise = await Exercise.create({
      name,
      primary,
      secondary,
      equipment,
    })
    res.status(201).json(newExercise)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update exercise details
export const updateExercise = async (req, res) => {
  try {
    const [rowsUpdated, [updatedExercise]] = await Exercise.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })

    if (!rowsUpdated)
      return res.status(404).json({ message: "Exercise not found" })
    res.json(updatedExercise)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete an exercise
export const deleteExercise = async (req, res) => {
  try {
    const deletedExercise = await Exercise.destroy({
      where: { id: req.params.id },
    })
    if (!deletedExercise)
      return res.status(404).json({ message: "Exercise not found" })
    res.json({ message: "Exercise deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
