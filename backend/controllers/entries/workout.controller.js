import WorkoutEntry from "../../models/entries/workout.model.js"

// Fetch all WorkoutEntries
export const getWorkoutEntries = async (req, res) => {
  try {
    const workout_entries = await WorkoutEntry.findAll()
    res.json(workout_entries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Fetch an WorkoutEntry by ID
export const getWorkoutEntriesById = async (req, res) => {
  try {
    const workoutEntry = await WorkoutEntry.findByPk(req.params.id)
    if (!workoutEntry)
      return res.status(404).json({ message: "Exercise not found" })
    res.json(workoutEntry)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create a new WorkoutEntry
export const createWorkoutEntry = async (req, res) => {
  try {
    // TODO: add actual fields and validation
    const { name, primary, secondary, equipment } = req.body
    //const newWorkoutEntry = await WorkoutEntry.create({
    //  name,
    //  primary,
    //  secondary,
    //  equipment,
    //})
    res.status(201).json(req.body)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createUserWorkoutEntry = async (req, res) => {
  try {

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update WorkoutEntry details
export const updateWorkoutEntry = async (req, res) => {
  try {
    const [rowsUpdated, [updatedWorkoutEntry]] = await WorkoutEntry.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })

    if (!rowsUpdated)
      return res.status(404).json({ message: "WorkoutEntry not found" })
    res.json(updatedWorkoutEntry)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete a WorkoutEntry
export const deleteWorkoutEntry = async (req, res) => {
  try {
    const deletedWorkoutEntry = await WorkoutEntry.destroy({
      where: { id: req.params.id },
    })
    if (!deletedWorkoutEntry)
      return res.status(404).json({ message: "WorkoutEntry not found" })
    res.json({ message: "WorkoutEntry deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
