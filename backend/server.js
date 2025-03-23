import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
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

app.listen(PORT, () => { console.log(`Backend listening on PORT ${PORT}!`) })
