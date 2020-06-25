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
        const found = await Cannabis.find(body.strain).first()
        if (found) {
            const inPref = await Cannabis.checkIfInPreferrences(found.id)
            console.log(inPref)
            if (inPref.length > 0) {
                return res.status(400).json({ message: `User already added ${body.strain} in preferrences` })
            }
            const added = await Cannabis.addPreferrences(user.id, found.id)
            if (added) { 
                const results = await Cannabis.getPreferrences(user.id)
                return res.status(200).json(results)
            }
        } else {
            const cannabis_id = await Cannabis.add(body)
            const added = await Cannabis.addPreferrences(user.id, cannabis_id[0])
            if (added) {
                const results = await Cannabis.getPreferrences(user.id)
                return res.status(200).json(results)
            }
        }
        res.status(400).json({ message: 'Error adding data' })
    } catch(e) {
        res.status(500).json({ message: 'request error' })
    }
})

router.delete('/:id', authenticate, async (req, res) => {
    const cannabis_id = req.params.id
    const user_id = req.decodedJWT.id
    try {
        const removed = await Cannabis.remove(cannabis_id, user_id)
        if (removed > 0) { 
            const results = await Cannabis.getPreferrences(user_id)
            return res.status(200).json(results)
        }
        res.status(404).json({ message: 'Preferrence not found in DB' })
    } catch(e) {
        res.status(500).json({ message: 'request error' })
    }
})

module.exports = router