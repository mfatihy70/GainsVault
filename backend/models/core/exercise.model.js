import { DataTypes } from "sequelize"
import { sequelize } from "../../config/db.js"

const muscles = [
  "chest",
  "traps",
  "delts",
  "biceps",
  "triceps",
  "forearms",
  "lats",
  "abs",
  "quads",
  "hamstrings",
  "glutes",
  "calves",
  "lower_back",
]

const equipment = ["barbell", "dumbbell", "cable", "machine", "bodyweight"]

// Define the Exercise model using Sequelize
const Exercise = sequelize.define("exercises", {
  // Primary key: unique identifier for each exercise
  id: {
    type: DataTypes.INTEGER, // Integer type
    primaryKey: true, // Marks this field as the primary key
    autoIncrement: true, // Automatically increments the value
  },
  // Name of the exercise
  name: {
    type: DataTypes.STRING(50), // String type with a maximum length of 50
    allowNull: false, // This field cannot be null
  },
  // Primary muscle group targeted by the exercise
  primary: {
    type: DataTypes.ENUM(...muscles), // Use ENUM with the muscles array
    allowNull: false, // This field cannot be null
  },
  // Secondary muscle group targeted by the exercise (optional)
  secondary: {
    type: DataTypes.ENUM(...muscles), // Use ENUM with the muscles array
    allowNull: true, // This field can be null
  },
  // Equipment required for the exercise (optional)
  equipment: {
    type: DataTypes.ENUM(...equipment), // Use ENUM with the equipment array
    allowNull: true, // This field can be null
  },
})

export default Exercise
