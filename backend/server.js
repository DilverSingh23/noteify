import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import notesRoute from "./routes/notes.js"

dotenv.config()

const PORT = process.env.PORT || 5050
const app = express()

app.use(cors())
app.use(express.json())
app.use("/", notesRoute)

app.get("/", (req, res) => {
    res.send("Testing.")
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


