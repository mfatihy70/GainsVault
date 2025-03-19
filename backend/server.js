import express from "express"
import connectDB from "./config/db.js"
const port = 5050

connectDB()
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello W!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
