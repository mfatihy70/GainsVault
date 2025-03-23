import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import logger from "./middlewares/logger.js"
import errorHandler from "./middlewares/error.js"
import notFound from "./middlewares/notFound.js"
import auth from "./middlewares/auth.js"
dotenv.config()

const PORT = 5050

connectDB()
const app = express()

// Middlewares
// Body parser middelware
app.use(express.json())
// Cors Middleware
app.use(cors())
// JWT Middleware
app.use(auth)
// Logger Middleware
app.use(logger)
// Not Found Middleware
app.use(notFound)
// Error Handler Middleware
app.use(errorHandler)

app.listen(PORT, () => { console.log(`Backend listening on PORT ${PORT}!`) })
