import { DataTypes } from "sequelize"
import { sequelize } from "../../config/db.js"

// Define the WorkoutEntry model using Sequelize
const WorkoutEntry = sequelize.define("workout_entries", {
  // Primary key for the workout entry
  id: {
    type: DataTypes.INTEGER, // Integer type
    primaryKey: true, // Marks this field as the primary key
    autoIncrement: true, // Auto-incrementing ID
  },
  // Foreign key referencing the user who performed the workout
  user_id: {
    type: DataTypes.INTEGER, // Integer type
    references: {
      model: "users", // References the "users" table
      key: "id", // References the "id" column in the "users" table
    },
  },
  // Foreign key referencing the workout performed
  workout_id: {
    type: DataTypes.INTEGER, // Integer type
    references: {
      model: "workouts", // References the "workouts" table
      key: "id", // References the "id" column in the "workouts" table
    },
  },
  // Timestamp for when the workout was performed
  performed_at: {
    type: DataTypes.DATE, // Date type
    defaultValue: DataTypes.NOW, // Defaults to the current date and time
  },
})

export default WorkoutEntry
