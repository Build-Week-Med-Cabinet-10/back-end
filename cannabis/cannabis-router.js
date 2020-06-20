const express = require('express')

const Cannabis = require('./cannabis-model')
const authenticate = require('../middleware/restricted-middleware')


const router = express.Router()

router.get('/', authenticate, async (req, res) => {
    const { id } = req.decodedJWT
    try {
        const results = await Cannabis.getPreferrences(id)
        console.log(results)
        if (results) { return res.status(200).json(results)}
        res.status(404).json({ message: 'no results' })
    } catch(e) {
        res.status(500).json({ message: 'request error' })
    }
})

module.exports = router