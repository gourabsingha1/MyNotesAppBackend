const router = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')

// Create note
router.post('/addNote', async (req, res) => {
    try {
        const note = new Note({
            title: req.body.title,
            note: req.body.note,
            postedBy: req.body.postedBy
        })

        const data = await note.save()
        res.status(200).json(data)
    } catch (e) {
        res.status(500).json(e)
    }
})

// Delete note
router.delete("/deleteNote/:id", async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id })
        if(!note) {
            res.status(400).json({ message: "note not found", status: false })
        }
        else {
            const deleteNote = await Note.deleteOne({ _id: req.params.id })
            res.status(200).json({ message: "note deleted successfully", status: true })
        }
    } catch (e) {
        res.status(500).json(e)
    }
})

// Update note
router.put("/updateNote/:id", async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id })
        if(!note) {
            res.status(400).json({ message: "note not found", status: false })
        }
        else {
            const updateNote = await Note.updateOne({
                title: req.body.title,
                note: req.body.note,
                postedBy: req.body.postedBy
            })
            res.status(200).json({ message: "note updated successfully", status: true })
        }
    } catch (e) {
        res.status(500).json(e)
    }
})

// Get notes
router.get("/getNotes/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        if(!user) {
            res.status(400).json({ data: "user not found" })
        }
        else {
            const notes = await Note.find({ postedBy: req.params.userId })
            res.status(200).json(notes)
        }
    } catch (e) {
        res.status(500).json(e)
    }
})

module.exports = router