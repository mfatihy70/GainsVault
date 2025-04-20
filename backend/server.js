import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"

// Routes
import usersRouter from "./routes/users.routes.js"
import profileRouter from "./routes/profile.routes.js"

dotenv.config()
const PORT = process.env.BACKEND_PORT || 5050
connectDB()

const app = express()

app.use(express.json())
app.use(cors())

// Routes
app.use("/api/users", usersRouter)
app.use("/api/profile", profileRouter)

app.listen(PORT, () => {
  console.log(`Backend listening on PORT ${PORT}!`)
})
