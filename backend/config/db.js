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
        rejectUnauthorized: false, // This is required for some cloud providers
      },
    },
    logging: false, // Set to console.log if you want to debug queries
  }
)

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log("Database connection established successfully.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

const startServer = async () => {
  await connectDB()

  // Sync models with the database
  sequelize
    .sync({ alter: true }) // `alter: true` will adjust the schema safely
    .then(() => console.log("✅ All models synced with DB"))
    .catch((err) => console.error("❌ Error syncing models:", err))
}

startServer()


export default connectDB;
export { sequelize };
