import Workout from "../../models/core/workout.model.js"
import Split from "../../models/core/split.model.js"
import WorkoutExercise from "../../models/core/workout_exercise.model.js"
import { sequelize } from "../../config/db.js"
import { Op } from "sequelize"

// Fetch all workouts for the user and default ones
export const getWorkouts = async (req, res) => {
  try {
    const whereClause = {
      [Op.or]: [{ user_id: null }],
    }

    if (req.user) {
      whereClause[Op.or].push({ user_id: req.user.id })
    }

    const workouts = await Workout.findAll({
      where: whereClause,
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
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" })
    }

    // If the workout is not a default workout, check if the user owns it
    if (workout.user_id !== null && (!req.user || workout.user_id !== req.user.id)) {
      return res.status(403).json({ message: "Not authorized to view this workout" })
    }
    
    res.json(workout)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create a new workout
export const createWorkout = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const { split_id, name, image, exercise_ids } = req.body
    const newWorkout = await Workout.create({
      user_id: req.user.id,
      split_id,
      name,
      image,
    }, { transaction: t })

    if (exercise_ids && exercise_ids.length > 0) {
      const workoutExercises = exercise_ids.map(exercise_id => ({
        workout_id: newWorkout.id,
        exercise_id,
      }))
      await WorkoutExercise.bulkCreate(workoutExercises, { transaction: t })
    }

    await t.commit()
    res.status(201).json(newWorkout)
  } catch (error) {
    await t.rollback()
    res.status(500).json({ message: error.message })
  }
}

// Update workout details
export const updateWorkout = async (req, res) => {
  try {
    const [rowsUpdated, [updatedWorkout]] = await Workout.update(req.body, {
      where: { id: req.params.id, user_id: req.user.id },
      returning: true,
    })

    if (!rowsUpdated)
      return res.status(404).json({ message: "Workout not found or user not authorized" })
    res.json(updatedWorkout)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete a workout
export const deleteWorkout = async (req, res) => {
  try {
    const deletedWorkout = await Workout.destroy({
      where: { id: req.params.id, user_id: req.user.id },
    })
    if (!deletedWorkout)
      return res.status(404).json({ message: "Workout not found or user not authorized" })
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
      return res.status(404).json({ message: "Split not found for this workout" })
    }

    res.json(workout.split)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
