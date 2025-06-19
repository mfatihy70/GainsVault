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
  await import("./models/sync.js")

  /* Sync the models - Uncomment when you want to create tables or alter them*/
  // await sequelize.sync({ alter: true })
  // console.log("✅ All models synced with database")

  // Import and mount routes AFTER sync
  const { default: usersRouter } = await import("./routes/user.routes.js")
  const { default: exerciseRouter } = await import(
    "./routes/core/exercise.routes.js"
  )
  const { default: splitsRouter } = await import(
    "./routes/core/split.routes.js"
  )
  const { default: workoutsRouter } = await import(
    "./routes/core/workout.routes.js"
  )
  const { default: workoutExerciseRouter } = await import(
    "./routes/core/workout_exercise.routes.js"
  )

  // Import entries routes
  const { default: entriesSetRouter } = await import(
    "./routes/entries/set.routes.js"
  )
  const { default: entriesWorkoutRouter } = await import(
    "./routes/entries/workout.routes.js"
  )
  const { default: entriesExerciseRouter } = await import(
    "./routes/entries/exercise.routes.js"
  )

  // Mount all routes
  app.use("/api/users", usersRouter)
  app.use("/api/exercises", exerciseRouter)
  app.use("/api/splits", splitsRouter)
  app.use("/api/workouts", workoutsRouter)
  app.use("/api/workout-exercises", workoutExerciseRouter)

  // Entries routes
  app.use("/api/entries/set", entriesSetRouter)
  app.use("/api/entries/workout", entriesWorkoutRouter)
  app.use("/api/entries/exercise", entriesExerciseRouter)

  // 404 handler for undefined routes
  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" })
  })

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  })
})
