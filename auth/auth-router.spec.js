const request = require('supertest');
const db = require('../data/dbconfig')
const Auth = require('./auth-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const server = require('../server.js'); 

const testUser = { username: "dummy", email: "dummy@yahoo.com", password: "secretword123"}
const preUser = { username: "thom27", email: "thom27@yahoo.com", password: "secretword123"}

const loginPreUser = { email: "thom27@yahoo.com", password: "secretword123"}
let token

describe('auth-router.js', () => {
    describe('POST /api/auth/register', () => {
       it('should return status code 201', async () => {
            const res = await request(server).post('/api/auth/register').send(testUser)
            expect(res.status).toBe(201)
       })
       it('should return status code 500', async () => {
            const res = await request(server).post('/api/auth/register').send(preUser)
            expect(res.status).toBe(500)
        })
    })
   
    describe('POST /api/auth/login', () => {
        it('should return status code 200', async () => {
            const res = await request(server).post('/api/auth/login').send(loginPreUser)
            expect(res.status).toBe(200)
        })
        it('should return status code 401', async () => {
            const res = await request(server).post('/api/auth/login').send({ email: "wrong_email", password: "wrong_pw" })
            expect(res.status).toBe(401)
        })
    })

    describe('POST /api/auth/logout', () => {
        it('should return status code 200', async () => {
            const res = await request(server).post('/api/auth/logout').set({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'})
            expect(res.status).toBe(200)
        })
        it('should return status code 401', async () => {
            const res = await request(server).post('/api/auth/logout').set({'Authorization': `Bearer wrongToken`, 'Content-Type': 'application/json'})
            expect(res.status).toBe(401)
        })
    })

    beforeEach(async () => {
        await db('users').truncate()
        const hash = bcrypt.hashSync("secretword123", 8)
        await Auth.add({ username: "thom27", email: "thom27@yahoo.com", password: hash })
        const user = await Auth.findByEmail("thom27@yahoo.com").first()
        token = generateToken(user)
        await Auth.addToken(user.id, token)
    })

    afterAll(async () => {
        await db('users').truncate()
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