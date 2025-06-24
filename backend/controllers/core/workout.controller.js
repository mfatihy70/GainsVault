import Workout from "../../models/core/workout.model.js"
import Split from "../../models/core/split.model.js"
import WorkoutExercise from "../../models/core/workout_exercise.model.js"

// Fetch all workouts
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.findAll({
      order: [["id", "ASC"]],
    })
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
    // Always set split_id to 13, and accept user_id from request
    const { name, order, user_id, image, default: isDefault, exercises } = req.body
    const newWorkout = await Workout.create({
      split_id: 13,
      user_id,
      name,
      order,
      image,
      default: isDefault ?? false,
    })

    // Add selected exercises to workout_exercises table
    if (Array.isArray(exercises) && exercises.length > 0) {
      const workoutExercises = exercises.map((exercise_id, idx) => ({
        workout_id: newWorkout.id,
        exercise_id,
        order: idx + 1,
      }))
      await WorkoutExercise.bulkCreate(workoutExercises)
    }

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

// =================================
///     Split related functions
// =================================

export const getSplitFromWorkoutId = async (req, res) => {
  try {
    const workout = await Workout.findByPk(req.params.workoutId, {
      include: {
        model: Split,
        as: "split",
      },
    })

    if (!workout || !workout.split) {
      return res
        .status(404)
        .json({ message: "Split not found for this workout" })
    }

    res.json(workout.split)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
