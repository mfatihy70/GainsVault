import { DataTypes } from "sequelize"
import { sequelize } from "../../config/db.js"

const SetEntry = sequelize.define(
  "set_entries",
  {
    // Foreign key referencing the exercise entry
    exercise_entry_id: {
      type: DataTypes.INTEGER, // Integer type
      references: {
        model: "exercise_entries", // References the "exercise_entries" table
        key: "id", // References the "id" column in the "exercise_entries" table
      },
      onDelete: "CASCADE", // Deletes associated set entries when the exercise entry is deleted
    },
    set_order: {
      type: DataTypes.INTEGER, // Integer type
      allowNull: false, // This field cannot be null
    },
    kg: {
      type: DataTypes.DECIMAL(5, 2), // Decimal type with precision (5 digits, 2 after the decimal)
      allowNull: false, // This field cannot be null
    },
    reps: {
      type: DataTypes.INTEGER, // Integer type
      allowNull: false, // This field cannot be null
    }, 
    performed_at: {
      type: DataTypes.DATE, // Date type
      defaultValue: DataTypes.NOW, // Defaults to the current date and time
    },
  },
  {
    timestamps: false,
  }
)

export default SetEntry
