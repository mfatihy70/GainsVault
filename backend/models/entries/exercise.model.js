import { DataTypes } from "sequelize"
import { sequelize } from "../../config/db.js"

const ExerciseEntry = sequelize.define(
  "exercise_entries",
  {
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
    performed_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
)

export default ExerciseEntry
