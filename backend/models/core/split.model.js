import { DataTypes } from "sequelize"
import { sequelize } from "../../config/db.js"

// Define the Split model using Sequelize
const Split = sequelize.define("splits", {
  // Primary key column 'id', auto-incremented
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // Foreign key column 'user_id', references 'id' in the 'users' table
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "users", // Name of the referenced table
      key: "id", // Name of the referenced column
    },
  },
  // Column 'name', a string with a maximum length of 50 characters, cannot be null
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  // Column 'is_default', a boolean with a default value of false
  is_default: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  // Column 'created_at', a date with a default value of the current timestamp
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
})

export default Split
