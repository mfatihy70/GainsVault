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

const Exercise = sequelize.define(
  "exercises",
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    primary: {
      type: DataTypes.ENUM(...muscles),
      allowNull: false,
    },
    secondary: {
      type: DataTypes.ENUM(...muscles),
      allowNull: true,
    },
    equipment: {
      type: DataTypes.ENUM(...equipment),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
)

export default Exercise
