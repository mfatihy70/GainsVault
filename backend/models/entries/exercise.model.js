import { DataTypes } from "sequelize"
import { sequelize } from "../../config/db.js"

// Define the ExerciseEntry model using Sequelize
const ExerciseEntry = sequelize.define("exercise_entries", {
  // Primary key for the exercise entry
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Automatically increment the ID
  },
  // Foreign key referencing the workout entry
  workout_entry_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "workout_entries", // References the workout_entries table
      key: "id", // References the id column in workout_entries
    },
    onDelete: "CASCADE", // Delete exercise entries if the associated workout entry is deleted
  },
  // Foreign key referencing the workout exercise
  workout_exercise_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "workout_exercises", // References the workout_exercises table
      key: "id", // References the id column in workout_exercises
    },
  },
  // Foreign key referencing the exercise
  exercise_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "exercises", // References the exercises table
      key: "id", // References the id column in exercises
    },
  },
  // Order of the exercise in the workout
  order: {
    type: DataTypes.INTEGER,
    allowNull: true, // Order is optional
  },
})

export default ExerciseEntry
