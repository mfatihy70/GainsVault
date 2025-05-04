import { DataTypes } from "sequelize"
import { sequelize } from "../../config/db.js"

const WorkoutEntry = sequelize.define(
  "workout_entries",
  {
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
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
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

export default WorkoutEntry
