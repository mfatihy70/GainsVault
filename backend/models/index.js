import { sequelize } from "../config/db.js"

// Import all models
import User from "./user.model.js"

import Split from "./core/split.model.js"
import Workout from "./core/workout.model.js"
import WorkoutExercise from "./core/workout_exercise.model.js"
import Exercise from "./core/exercise.model.js"

import WorkoutEntry from "./entries/workout.model.js"
import ExerciseEntry from "./entries/exercise.model.js"
import SetEntry from "./entries/set.model.js"

// --- Associations ---

// User has many Splits
User.hasMany(Split, { foreignKey: "user_id" })
Split.belongsTo(User, { foreignKey: "user_id" })

// Split has many Workouts
Split.hasMany(Workout, { foreignKey: "split_id", onDelete: "CASCADE" })
Workout.belongsTo(Split, { foreignKey: "split_id" })

// Workout has many WorkoutExercises
Workout.hasMany(WorkoutExercise, {
  foreignKey: "workout_id",
  onDelete: "CASCADE",
})
WorkoutExercise.belongsTo(Workout, { foreignKey: "workout_id" })

// Exercise can belong to many WorkoutExercises
Exercise.hasMany(WorkoutExercise, { foreignKey: "exercise_id" })
WorkoutExercise.belongsTo(Exercise, { foreignKey: "exercise_id" })

// WorkoutEntry belongs to User and Workout
WorkoutEntry.belongsTo(User, { foreignKey: "user_id" })
WorkoutEntry.belongsTo(Workout, { foreignKey: "workout_id" })

User.hasMany(WorkoutEntry, { foreignKey: "user_id" })
Workout.hasMany(WorkoutEntry, { foreignKey: "workout_id" })

// WorkoutEntry has many ExerciseEntries
WorkoutEntry.hasMany(ExerciseEntry, {
  foreignKey: "workout_entry_id",
  onDelete: "CASCADE",
})
ExerciseEntry.belongsTo(WorkoutEntry, { foreignKey: "workout_entry_id" })

// ExerciseEntry references both WorkoutExercise and Exercise
WorkoutExercise.hasMany(ExerciseEntry, { foreignKey: "workout_exercise_id" })
ExerciseEntry.belongsTo(WorkoutExercise, { foreignKey: "workout_exercise_id" })

Exercise.hasMany(ExerciseEntry, { foreignKey: "exercise_id" })
ExerciseEntry.belongsTo(Exercise, { foreignKey: "exercise_id" })

// ExerciseEntry has many SetEntries
ExerciseEntry.hasMany(SetEntry, {
  foreignKey: "exercise_entry_id",
  onDelete: "CASCADE",
})
SetEntry.belongsTo(ExerciseEntry, { foreignKey: "exercise_entry_id" })

// Export all models (optional, for convenience)
export {
  sequelize,
  User,
  Split,
  Workout,
  WorkoutExercise,
  Exercise,
  WorkoutEntry,
  ExerciseEntry,
  SetEntry,
}
