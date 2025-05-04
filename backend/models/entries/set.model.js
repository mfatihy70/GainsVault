import { DataTypes } from "sequelize"
import { sequelize } from "../../config/db.js"

// Define the SetEntry model for the "set_entries" table
const SetEntry = sequelize.define("set_entries", {
  // Primary key for the set entry
  id: {
    type: DataTypes.INTEGER, // Integer type
    primaryKey: true, // Marks this field as the primary key
    autoIncrement: true, // Auto-incrementing ID
  },
  // Foreign key referencing the exercise entry
  exercise_entry_id: {
    type: DataTypes.INTEGER, // Integer type
    references: {
      model: "exercise_entries", // References the "exercise_entries" table
      key: "id", // References the "id" column in the "exercise_entries" table
    },
    onDelete: "CASCADE", // Deletes associated set entries when the exercise entry is deleted
  },
  // The set number (e.g., 1st set, 2nd set, etc.)
  set_number: {
    type: DataTypes.INTEGER, // Integer type
    allowNull: false, // This field cannot be null
  },
  // The weight lifted in kilograms
  kg: {
    type: DataTypes.DECIMAL(5, 2), // Decimal type with precision (5 digits, 2 after the decimal)
    allowNull: false, // This field cannot be null
  },
  // The number of repetitions performed
  reps: {
    type: DataTypes.INTEGER, // Integer type
    allowNull: false, // This field cannot be null
  },
})

export default SetEntry
