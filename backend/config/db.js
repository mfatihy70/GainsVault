// config/db.js
import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
)

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log("✅ Database connected")
  } catch (err) {
    console.error("❌ DB connection failed:", err)
  }
}

export { sequelize }
export default connectDB
