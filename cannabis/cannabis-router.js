const express = require('express')

const Cannabis = require('./cannabis-model')
const authenticate = require('../middleware/restricted-middleware')


const router = express.Router()

router.get('/', authenticate, async (req, res) => {
    const { id } = req.decodedJWT
    try {
        const results = await Cannabis.getPreferrences(id)
        if (results) { return res.status(200).json(results)}
        res.status(404).json({ message: 'no results' })
    } catch(e) {
        res.status(500).json({ message: 'request error' })
    }
})

router.post('/', authenticate, async (req, res) => {
    const body = req.body
    const user = req.decodedJWT
    try {
        const found = await Cannabis.find(body.name).first()
        if (found > 0) {
            const inPref = await Cannabis.checkIfInPreferrences(found.id)
            if (inPref) {
                return res.status(400).json({ message: `User already added ${found.name} in preferrences` })
            }
            const result = await Cannabis.addPreferrences(user.id, found.id)
            if (result) { 
                return res.status(200).json({ message: `${found.name} successfully added to pref`})
            }
        } else {
            await Cannabis.add(body)
            const result = await Cannabis.addPreferrences(user.id, found.id)
            if (result) {
                return res.status(200).json({ message: `${found.name} successfully added to pref`})}
            }
        res.status(400).json({ message: 'Error adding data' })
    } catch(e) {
        res.status(500).json({ message: 'request error' })
    }
})

module.exports = router