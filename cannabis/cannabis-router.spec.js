const request = require('supertest');
const db = require('../data/dbconfig')
const Auth = require('../auth/auth-model')
const Cannabis = require('./cannabis-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const server = require('../server.js'); 
let token

describe('cananbis-router.js', () => {
    describe('GET /api/cananbis', () => {

        it('should return status code 500', async () => {
            const res = await request(server).get('/api/cananbis/').set({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'})
            console.log(res.body)
            expect(res.status).toBe(500)
        })
        // it('should return status code 200', async () => {
        //     const res = await request(server).get('/api/jokes/').set({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'})
        //     expect(res.status).toBe(200)
        // })
        beforeAll(async () => {
            await db('users').truncate()
            const hash = bcrypt.hashSync("secretword123", 8)
            await Auth.add({ username: "thom27", email: "thom27@yahoo.com", password: hash })
            const user = await Auth.findByEmail("thom27@yahoo.com").first()
            token = generateToken(user)
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
        beforeEach(async () => {
            await db('cannabis').truncate()
            await db('users_cannabis').truncate()
            await Cannabis.add({strain: 'blue dream', effect: 'day dreamy', flavor: 'blue'})
            await Cannabis.addPreferrences(1, 1)
        })

    })
})