import { DataTypes } from "sequelize"
import { sequelize } from "../../config/db.js"

// Define the Workout model using Sequelize
const Workout = sequelize.define("workouts", {
  // Primary key for the workouts table
  id: {
    type: DataTypes.INTEGER, // Integer type
    primaryKey: true, // Marks this field as the primary key
    autoIncrement: true, // Automatically increments the value
  },
  // Foreign key referencing the splits table
  split_id: {
    type: DataTypes.INTEGER, // Integer type
    references: {
      model: "splits", // References the splits table
      key: "id", // References the id column in the splits table
    },
    onDelete: "CASCADE", // Deletes associated workouts when a split is deleted
  },
  // Name of the workout
  name: {
    type: DataTypes.STRING(50), // String type with a maximum length of 50
    allowNull: false, // Field cannot be null
  },
  // Order of the workout in the split
  order: {
    type: DataTypes.INTEGER, // Integer type
    allowNull: false, // Field cannot be null
  },
})

export default Workout
