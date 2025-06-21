import WorkoutExercise from "../../models/core/workout_exercise.model.js"
import Exercise from "../../models/core/exercise.model.js"
import ExerciseEntry from "../../models/entries/exercise.model.js"
import SetEntry from "../../models/entries/set.model.js"
import WorkoutEntry from "../../models/entries/workout.model.js"
import { sequelize } from "../../config/db.js"

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
    // Hold the tracked workout data
    const tracked = req.body

    const result = await sequelize.transaction(async (t) => {
      console.log("Transaction started for creating tracked workout");
      //return;
      // 1. Create workout entry
      const workoutEntry = await WorkoutEntry.create({
        user_id: tracked.userId,
        workout_id: tracked.workoutId,
        name: tracked.name,
        //  performed_at: tracked.performedAt,
        default: tracked.default, // user-defined workout => default == false
        start: tracked.start,
        end: tracked.end,
      }, { transaction: t });

      //console.log("Workout entry created:", workoutEntry.id);

      // 2. Loop through exercises
      for (const exercise of tracked.exercises) {
        console.log("Processing exercise:", exercise);

        let workoutExerciseId = null;

        // Only find workoutExercise if it's a predefined workout (default == true)
        if (tracked.default) {
          // Find performed workoutExercise by exercise ID
          const workoutExercise = await WorkoutExercise.findOne({
            where: {
              workout_id: tracked.workoutId,
              exercise_id: exercise.exerciseId,
            },
            transaction: t,
          });

          workoutExerciseId = workoutExercise?.id ?? null;
          console.log("Found workout exercise:", workoutExerciseId ?? "none");
        }

        // Create a new exercise entry for the current workout
        const exerciseEntry = await ExerciseEntry.create({
          workout_entry_id: workoutEntry.id,
          workout_exercise_id: workoutExerciseId, // if null, it means this is a custom exercise not linked to a predefined workout exercise
          exercise_id: exercise.exerciseId,
          notes: exercise.notes || null,
          //performed_at: exercise.performedAt,
        }, { transaction: t });

        // 3. Bulk insert set entries
        const setEntries = exercise.sets.map((set) => ({
          exercise_entry_id: exerciseEntry.id,
          set_order: set.set_order,
          kg: set.kg,
          reps: set.reps,
          //performed_at: set.performedAt,
        }));

        await SetEntry.bulkCreate(setEntries, { transaction: t });
      }
      //
      return workoutEntry;
    });

    console.log('Workout successfully saved:', result);
    res.json(req.body)
  } catch (error) {
    console.error('Transaction failed. Rolled back.', error);
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
