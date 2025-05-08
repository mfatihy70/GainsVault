import Workout from "../../models/core/workout.model.js"

// Fetch all workouts
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.findAll()
    res.json(workouts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Fetch a workout by ID
export const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findByPk(req.params.id)
    if (!workout) return res.status(404).json({ message: "Workout not found" })
    res.json(workout)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create a new workout
export const createWorkout = async (req, res) => {
  try {
    const { split_id, name, order } = req.body
    const newWorkout = await Workout.create({
      split_id,
      name,
      order,
    })
    res.status(201).json(newWorkout)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update workout details
export const updateWorkout = async (req, res) => {
  try {
    const [rowsUpdated, [updatedWorkout]] = await Workout.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })

    if (!rowsUpdated)
      return res.status(404).json({ message: "Workout not found" })
    res.json(updatedWorkout)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete a workout
export const deleteWorkout = async (req, res) => {
  try {
    const deletedWorkout = await Workout.destroy({
      where: { id: req.params.id },
    })
    if (!deletedWorkout)
      return res.status(404).json({ message: "Workout not found" })
    res.json({ message: "Workout deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
