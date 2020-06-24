const request = require('supertest');
const db = require('../data/dbconfig')
const Auth = require('../auth/auth-model')
const Cannabis = require('./cannabis-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const server = require('../server.js'); 

const testCannabis = { strain: 'drawgs', effect: 'dope', flavor: 'peach', type: 'stativa', description: 'dope as hell' }

describe('cananbis-model.js', () => {

    it('should add cannabis to DB and return id value', async () => {
        const result = await Cannabis.add({ strain: 'test', effect: 'dank', flavor: 'tangerine' })
        expect(result[0]).toBe(2)
    })
    it('should remove cannabis from DB and return a value of 1', async () => {
        const result = await Cannabis.remove(1,1)
        expect(result).toBe(1)
    })
    it('should find cannabis and return it', async () => {
        const result = await Cannabis.find('drawgs').first()
        expect(result).toEqual({...testCannabis, id: 1 })
    })
    it('should add preferrence and return id users_cannabis', async () => {
        const result = await Cannabis.addPreferrences(2, 2)
        expect(result[0]).toBe(2)
    })
    it('should add preferrence and return id users_cannabis', async () => {
        const result = await Cannabis.checkIfInPreferrences(1)
        expect(result.length > 0).toBe(true)
    })

    beforeEach(async () => {
        await db('cannabis').truncate()
        await db('users_cannabis').truncate()
        await Cannabis.addPreferrences(1, 1)
        await Cannabis.add(testCannabis)
    })

    afterEach(async () => {
        await db('cannabis').truncate()
        await db('users_cannabis').truncate()

    })
})