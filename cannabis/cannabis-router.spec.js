const request = require('supertest');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const db = require('../data/dbconfig')
const Auth = require('../auth/auth-model')
const Cannabis = require('./cannabis-model')



const server = require('../server.js'); 

let token
let user_id

describe('cananbis-router.js', () => {
    describe('GET /api/cannabis/', () => {
       it('should return status code 404', async () => {
            const res = await request(server).get('/api/cananbis/').set({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'})
            expect(res.status).toBe(404)
       })
       it('should return status code 200', async () => {
            await Cannabis.add({ strain: 'test', flavor: 'strawb', effect: 'happy' })
            await Cannabis.addPreferrences(user_id, 1)
            const res = await request(server).get('/api/cananbis/').set({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'})
            expect(res.status).toBe(200)
        })
    })

    beforeEach(async () => {
        await db('users').truncate()
        await db('cannabis').truncate()
        await db('users_cannabis').truncate()
        const hash = bcrypt.hashSync("secretword123", 8)
        await Auth.add({ username: "thom27", email: "thom27@yahoo.com", password: hash })
        const user = await Auth.findByEmail("thom27@yahoo.com").first()
        user_id = user.id
        token = generateToken(user)
        await Auth.addToken(user_id, token)
    })

    afterAll(async () => {
        await db('users').truncate()
        await db('cannabis').truncate()
        await db('users_cannabis').truncate()
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
});