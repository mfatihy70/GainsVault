import { DataTypes } from "sequelize"
import { sequelize } from "../../config/db.js"

// Define the WorkoutExercise model using Sequelize
const WorkoutExercise = sequelize.define("workout_exercises", {
  // Primary key for the workout_exercises table
  id: {
    type: DataTypes.INTEGER, // Integer type
    primaryKey: true, // Marks this field as the primary key
    autoIncrement: true, // Auto-incrementing ID
  },
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
  // Order of the exercise in the workout
  order: {
    type: DataTypes.INTEGER, // Integer type
    allowNull: false, // This field cannot be null
  },
})

export default WorkoutExercise
