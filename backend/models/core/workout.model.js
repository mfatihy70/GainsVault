import { DataTypes } from "sequelize"
import { sequelize } from "../../config/db.js"

const Workout = sequelize.define(
  "workouts",
  {
    // Foreign key referencing the splits table
    split_id: {
      type: DataTypes.INTEGER, // Integer type
      references: {
        model: "splits", // References the splits table
        key: "id", // References the id column in the splits table
      },
      onDelete: "CASCADE", // Deletes associated workouts when a split is deleted
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default value is false
    },
  },
  {
    timestamps: false,
  }
)

export default Workout
