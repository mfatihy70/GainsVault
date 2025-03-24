import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"

// Routes
import users from "./routes/users.js"
import auth from "./routes/auth.js"

// Middlewares
import logger from "./middlewares/logger.js"
import errorHandler from "./middlewares/errorHandler.js"
import notFound from "./middlewares/notFound.js"
import { migration } from "./data/migration.js"
dotenv.config()

const PORT = process.env.BACKEND_PORT || 5050

connectDB()
// Run DB migration
migration()

const app = express()

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Cors Middleware
app.use(cors())

// Routes
app.use('/api/users', users)
app.use('/api/auth', auth)

// Logger Middleware
app.use(logger)
// Not Found Middleware
app.use(notFound)
// Error Handler Middleware
app.use(errorHandler)

app.listen(PORT, () => { console.log(`Backend listening on PORT ${PORT}!`) })
