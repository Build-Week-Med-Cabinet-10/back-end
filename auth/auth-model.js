const db = require('../data/dbconfig')

module.exports = {
    add,
    findByEmail,
    findByToken,
    removeToken,
    addToken
}

function add(user) {
    return db('users')
            .insert(user)
            .then(() => {
                return db('users').where({ email: user.email })
            })
}

function findByEmail(email) {
    return db('users').where({email})
}

function findByToken(token) {
    return db('users').where({token})
}

function addToken(id, token) {
    return db('users').where({id}).update({ token })
}

function removeToken(token) {
    return db('users').where({token}).update({ token: "" })
}