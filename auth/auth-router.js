const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Auth = require('./auth-model')

const router = express.Router()

router.post('/register', async (req, res) => {
    let body = req.body
    const hash = bcrypt.hashSync(body.password, 8)
    body.password = hash
    try {
      const user = await Auth.add(body)
      const token = generateToken(user)
      res.status(201).json({ username: user.username, token })  
    } catch(e) {
        res.status(500).json({ message: 'request error' })
    }
})

router.post('/login', async (req, res) => {
    let { email, password } = req.body
    try {
        const user = await Auth.findBy(email).first()
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user)
            res.status(200).json({ username: user.username, token })
        } else {
            res.status(401).json({ message: 'wrong credentials' })
        }
    } catch(e) {
        res.status(500).json({ message: 'request error' })
    }
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    }

    const options = {
        expiresIn: "2h"
    }

    return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = router