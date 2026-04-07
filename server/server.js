require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")

const mongoose = require("mongoose")

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Connected on Database"))
    .catch(err => console.error(err))
const conn = mongoose.connection

conn.on("error", (error) => console.error(error))
conn.once("open", () => console.log("Open"))

app.use(express.json())
app.use(cors({
    origin:[
        "http://localhost:5173",
        "https://arrendei.vercel.app"
    ],
    credentials: true
}))

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ limit: "10mb", extended: true }))

const userRouter = require("./routes/users")
app.use("/users", userRouter)

const postRouter = require("./routes/posts")
app.use("/posts", postRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server started on port:", PORT)
})