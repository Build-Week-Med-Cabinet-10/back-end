const jwt = require('jsonwebtoken')
const Auth = require('../auth/auth-model')

module.exports = async (req, res, next) => {
    // token must be included in the header as Authorization
    const [directive, token] = req.headers.authorization.split(" ")
    if (!directive || directive != 'Bearer') {
        res.status(401).json({ message: 'no bear!' })
    }
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'invalid token' })
            }
            const user = await Auth.findByToken(token)
            if (user.length < 1) { return res.status(401).json({ message: 'invalid token' }) }
            req.token = token
            req.decodedJWT = decodedToken
            next()
        })
    } else {
        res.status(401).json({ message: 'No token found' })
    }
}