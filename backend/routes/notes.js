import db from "../db/connnections.js"
import { ObjectId } from "mongodb"
import express from "express"
import verifyToken from "../auth/middleware.js"

const router = express.Router()
let notesCollection = db.collection("notes")

// Get all user notes
router.get("/notes", verifyToken, async (req, res) => {
    try {
        const userNotes = await notesCollection
            .find({ userId: req.user.uid})
            .sort({ updatedAt: -1 })
            .toArray()

        res.status(200).json(userNotes)
        console.log("Successfully loaded user notes.")
    } catch(err) {
        console.error("Server issue when fetching user notes: ", err)
        res.status(500).json({ error: "Failed to fetch user notes." })
    }
})

// Read a specific user note
router.get("/notes/:id", verifyToken, async (req, res) => {
    try {
        const noteId = ObjectId.createFromHexString(req.params.id)
        const userNote = await notesCollection.findOne({ _id: noteId })
        if (userNote) {
            res.status(200).json(userNote)
        }
        else {
            console.log("Could not fetch user note.")
            res.status(404).json({ error: "Requested note not avaliable."})
        }
    } catch (err) {
        console.log("Server issue when trying to fetch note: ", err)
        res.status(500).json({ error: "Failed to fetch user note."})
    }
})

// Create a new note
router.post("/createNote", verifyToken, async(req, res) => {
    try {
        const userNotes = await notesCollection
            .find({ userId: req.user.uid })
            .toArray()
        if (userNotes.length == 10) {
            console.log("Reached note limit.")
            res.status(404).json({ error: "Note limit reached. Delete a note to make a new one."})
            return
        }
        if (!req.body.title || !req.body.message) {
            res.status(404).json({ error: "Your title or message can not be empty!" })
            return
        }
        const newNote = {
            userId: req.user.uid,
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
router.patch("/updateNote/:id", verifyToken, async (req, res) => {
    try {
        const noteId = { _id: ObjectId.createFromHexString(req.params.id) }
        const newTitle = req.body.title
        const newMessage = req.body.message
        if (!newTitle|| !newMessage) {
            res.status(400).json({ error: "Your title or message can not be empty!" })
            return
        }
        const updates = {
            $set: {
                title: req.body.title,
                message: req.body.message,
                lastUpdated: new Date()
            }
        }
        let result = await notesCollection.updateOne(noteId, updates)
        if (result.matchedCount === 1) {
            console.log("Succesfully updated note")
            res.status(200).json(result)
        }
        else {
            console.log("Note update error.")
            res.status(404).json({ error: "Requested note to update does not exist." })
        }
    } catch(err) {
        console.error("Server issue when updating note: ", err)
        res.status(500).json({ error: "Unable to edit note." })
    }
})

// Delete an existing note
router.delete("/deleteNote/:id", verifyToken, async (req, res) => {
    try {
        const noteId = { _id: ObjectId.createFromHexString(req.params.id) }
        let result = await notesCollection.deleteOne(noteId)
        if (result.deletedCount == 1) {
            console.log("Successfully deleted note.")
            res.status(200).json(result)
        }
        else {
            console.error("Note deletion error.")
            res.status(404).json({ error: "Requested note to delete does not exist." })
        }
    } catch(err) {
        console.error("Server issue when deleting note: ", err)
        res.status(500).json({ error: "Unable to delete note." })
    }
})

export default router

