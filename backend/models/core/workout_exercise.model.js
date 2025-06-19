import { DataTypes } from "sequelize"
import { sequelize } from "../../config/db.js"

const WorkoutExercise = sequelize.define(
  "workout_exercises",
  {
    // Foreign key referencing the workouts table
    workout_id: {
      type: DataTypes.INTEGER, // Integer type
      references: {
        model: "workouts", // References the workouts table
        key: "id", // References the id column in the workouts table
      },
      onDelete: "CASCADE", // Deletes associated records on parent deletion
    },
    // Foreign key referencing the exercises table
    exercise_id: {
      type: DataTypes.INTEGER, // Integer type
      references: {
        model: "exercises", // References the exercises table
        key: "id", // References the id column in the exercises table
      },
    },
  },
  {
    timestamps: false,
  }
)

export default WorkoutExercise
