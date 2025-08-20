import db from "../db/connnections.js"
import { ObjectId } from "mongodb"
import express from "express"

const router = express.Router()
let notesCollection = db.collection("notes")

// Get all user notes
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

// Read a specific user note
router.get("/note/:id", async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10)
        const noteId = ObjectId.createFromHexString(req.params.id)
        const userNote = await notesCollection.findOne({ _id: noteId, userId: userId})
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

// Create a new note
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

// Edit an existing note
router.patch("/updateNote/:id", async (req, res) => {
    try {
        const noteId = { _id: ObjectId.createFromHexString(req.params.id) }
        const newTitle = req.body.title
        const newMessage = req.body.message
        if (newTitle.length == 0 || newMessage.length == 0) {
            res.status(404).json({ error: "Your title or message can not be empty!" })
        }
        const updates = {
            $set: {
                title: req.body.title,
                message: req.body.message,
                lastUpdated: new Date()
            }
        }
        let result = await notesCollection.updateOne(noteId, updates)
        console.log("Succesfully updated note")
        res.status(200).json(result)
    } catch(err) {
        console.error("Node update error: ", err)
        res.status(500).json({ error: "Unable to edit note." })
    }
})

// Delete an existing note
router.delete("/deleteNote/:id", async (req, res) => {
    try {
        const noteId = { _id: ObjectId.createFromHexString(req.params.id) }
        let result = await notesCollection.deleteOne(noteId)
        console.log("Successfully deleted note")
        res.status(200).json(result)
    } catch(err) {
        console.error("Node deletion error: ", err)
        res.status(404).json({ error: "Unable to delete note." })
    }
})

export default router

