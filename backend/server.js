import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB, { sequelize } from "./config/db.js"

dotenv.config()
const PORT = process.env.BACKEND_PORT || 5050

const app = express()
app.use(express.json())
app.use(cors())

connectDB().then(async () => {
  // Load and register all models and their associations
  await import("./models/index.js")

  /* Sync the models uncomment when you want to create tables or alter them*/
  // await sequelize.sync({ alter: true }) // or { force: true } in dev
  // console.log("✅ All models synced with database")

  // Import and mount routes AFTER sync
  const { default: usersRouter } = await import("./routes/user.routes.js")
  app.use("/api/user", usersRouter)

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  })
})
