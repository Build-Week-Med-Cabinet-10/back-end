const db = require('../data/dbconfig')

module.exports = {
    add,
    findBy
}

function add(user) {
    return db('users').insert(user)
        .then(() => user )
}

function findBy(email) {
    return db('users').where({email})
}