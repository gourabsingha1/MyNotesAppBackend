const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const morgan = require('morgan')
const helmet = require('helmet')
const authRouter = require('./routes/auth')
const notesRouter = require('./routes/notes')
const app = express()

// Add middleware
app.use(express.json())
app.use(morgan('common'))
app.use(helmet())

// Add router
app.get('/', (req, res) => {
    res.send({title: 'MyNotes'})
})
app.get('/notes', (req, res) => {
    res.send('notes fetched successfully')
})
app.use('/api/auth', authRouter)
app.use('/api/notes', notesRouter)

// Set port to host api
const PORT = process.env.PORT || 8000

// Connect mongo db database
// mongoose
//     .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('MongoDB Connected')
//     })
//     .catch((error) => {
//         console.log(error)
//         process.exit(1)
//     })

// app.listen(PORT, () => {
//     console.log(`App is running on PORT: ${PORT}`)
// })

mongoose.set('strictQuery', false)
const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch(error) {
        console.log(error)
        process.exit(1)
    }
}
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`App is running on PORT: ${PORT}`)
    })
})