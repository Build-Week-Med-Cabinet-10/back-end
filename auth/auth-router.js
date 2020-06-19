const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Auth = require('./auth-model')
const authenticate = require('../middleware/restricted-middleware')

const router = express.Router()

router.post('/register', async (req, res) => {
    let body = req.body
    const hash = bcrypt.hashSync(body.password, 8)
    body.password = hash
    try {
      const user = await Auth.add(body)
      const token = generateToken(user)
      if (tokenAdded > 0) {
        return res.status(201).json({ username: user.username, email: user.email })  
      }
      res.status(400).json({ message: 'Error adding user' })
    } catch(e) {
        res.status(500).json({ message: 'request error' })
    }
})

router.post('/login', async (req, res) => {
    let { email, password } = req.body
    try {
        const user = await Auth.findByEmail(email).first()
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user)
            const tokenAdded= await Auth.addToken(user.id, token)
            if (tokenAdded > 0) { 
                return res.status(200).json({ username: user.username, email: user.email, token })
            }
        }
        res.status(401).json({ message: 'wrong credentials' })
    } catch(e) {
        res.status(500).json({ message: 'request error' })
    }
})

router.post('/logout', authenticate, async (req, res) => {
    const username = req.decodedJWT.username
    try {
        console.log(req.decodedJWT)
        const user = await Auth.removeToken(req.token)
        if (user > 0) { return res.status(200).json({ message: `${username} successfully logged out.` })}
        res.status(404).json({ message: 'user not found' })
    } catch(e) {
        res.status(500).json({ message: 'request error' })
    }
})

function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email
    }

    const options = {
        expiresIn: "2h"
    }

    return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = router