require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")

const mongoose = require("mongoose")

mongoose.connect(process.env.DATABASE_URL)
const conn = mongoose.connection

conn.on("error", (error) => console.error(error))
conn.once("open", () => console.log("Connected on Database"))

app.use(express.json())
app.use(cors())

const userRouter = require("./routes/users")
app.use("/users", userRouter)

app.listen(process.env.PORT || 3000, () => console.log("Server started!"))