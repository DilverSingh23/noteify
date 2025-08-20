import db from "../db/connnections.js"
import { ObjectId } from "mongodb"
import express from "express"

const router = express.Router()
let notesCollection = db.collection("notes")


router.get("/user/:userId", async (req, res) => {
    try {
        const id = parseInt(req.params.userId, 10)
        const userNotes = await notesCollection
            .find({ userId: id})
            .sort({ updatedAt: -1 })
            .toArray()

        res.status(200).json(userNotes)
        console.log("Successfully loaded user notes.")
    } catch(err) {
        console.error("Could not get user notes: ", err)
        res.status(500).json({ error: "Failed to fetch user notes." })
    }
})

router.get("/note/:id", async (req, res) => {
    try {
        const noteId = ObjectId.createFromHexString(req.params.id)
        const userNote = await notesCollection.findOne({ _id: noteId })
        if (userNote) {
            res.status(200).json(userNote)
        }
        else {
            res.status(404).json({ error: "Requested note not avaliable."})
        }
    } catch (err) {
        console.log("Could not load user note: ", err)
        res.status(500).json({ error: "Failed to fetch user note."})
    }
})

router.post("/createNote", async(req, res) => {
    try {
        const userNotes = await notesCollection
            .find({ userId: req.params.userId })
            .toArray()
        if (userNotes.length == 10) {
            console.log("Reached note limit.")
            res.status(400).json({ error: "Note limit reached. Delete a note to make a new one."})
        }
        const newNote = {
            userId: req.body.userId,
            title: req.body.title,
            message: req.body.message,
            lastUpdated: new Date()
        }
        let result = await notesCollection.insertOne(newNote)
        console.log("Successfully added a note.")
        res.status(200).json(result)
    } catch(err) {
        console.error("Server error trying to make new note: ", err)
        res.status(500).json({ error: "Unable to create new note." })
    }
})

export default router

