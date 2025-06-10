import WorkoutExercise from "../../models/core/workout_exercise.model.js"
import Exercise from "../../models/core/exercise.model.js"

// Fetch all exercises for a specific workout
export const getWorkoutExercises = async (req, res) => {
  try {
    const workoutExercises = await WorkoutExercise.findAll()
    res.json(workoutExercises)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export const createTrackedWorkout = async (req, res) => {
  try {
    console.log("Creating Tracked Workout exercises:", req.body)
    res.json(req.body)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Fetch a workout exercise by ID
export const getWorkoutExerciseById = async (req, res) => {
  try {
    const workoutExercise = await WorkoutExercise.findByPk(req.params.id)
    if (!workoutExercise)
      return res.status(404).json({ message: "Workout exercise not found" })
    res.json(workoutExercise)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create a new workout exercise
export const createWorkoutExercise = async (req, res) => {
  try {
    const { workout_id, exercise_id, order } = req.body
    const newWorkoutExercise = await WorkoutExercise.create({
      workout_id,
      exercise_id,
      order,
    })
    res.status(201).json(newWorkoutExercise)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update workout exercise details
export const updateWorkoutExercise = async (req, res) => {
  try {
    const [rowsUpdated, [updatedWorkoutExercise]] =
      await WorkoutExercise.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      })

    if (!rowsUpdated)
      return res.status(404).json({ message: "Workout exercise not found" })
    res.json(updatedWorkoutExercise)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete a workout exercise
export const deleteWorkoutExercise = async (req, res) => {
  try {
    const deletedWorkoutExercise = await WorkoutExercise.destroy({
      where: { id: req.params.id },
    })
    if (!deletedWorkoutExercise)
      return res.status(404).json({ message: "Workout exercise not found" })
    res.json({ message: "Workout exercise deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Fetch all exercises for a specific workout, with exercise info
export const getExercisesForWorkout = async (req, res) => {
  try {
    const workoutExercises = await WorkoutExercise.findAll({
      where: { workout_id: req.params.workoutId },
      include: [{ model: Exercise }],
    })

    res.json(workoutExercises)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}