const mongoose = require('mongoose')
const Note = new mongoose.Schema(
    {
        title: {
            type: String,
            min: 5,
            max: 50,
            required: true
        },
        note: {
            type: String,
            min: 5,
            required: true
        },
        postedBy: {
            type: String,
            min: 5,
            max: 30,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('note', Note)