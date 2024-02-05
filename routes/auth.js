const router = require('express').Router()
const User = require('../models/User')

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if(!user) {
            res.status(400).json({ message: "user not found", status: false })
        }
        else {
            const validatePassword = req.body.password == user.password
            if(!validatePassword) {
                res.status(400).json({ message: "wrong password", status: false })
            }
            else {
                res.status(200).json(user)
            }
        }
    } catch (e) {
        res.status(500).json(e)
    }
})

router.post('/register', async (req, res) => {
    try {
        const checkUser = await User.findOne({ email: req.body.email })
        if(checkUser) {
            res.status(400).json({ message: "email already in use", status: false })
        }
        else {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })

            const data = await user.save()
            res.status(200).json(data)
        }
    } catch (e) {
        res.status(500).json(e)
    }
})


module.exports = router