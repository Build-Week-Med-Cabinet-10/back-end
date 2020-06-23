const db = require('../data/dbconfig')

module.exports = {
    getPreferrences,
    find,
    add,
    addPreferrences,
    checkIfInPreferrences
}

function getPreferrences(id) {
    return db('users as u')
        .join('users_cannabis as uc', 'u.id', 'uc.user_id')
        .join('cannabis as c', 'uc.cannabis_id', 'c.id')
        .where('u.id', id)
        .select('c.id','c.strain', 'c.type', 'c.effect', 'c.flavor', 'c.description')
}

function checkIfInPreferrences(id) {
    return db('users as u')
        .join('users_cannabis as uc', 'u.id', 'uc.user_id')
        .join('cannabis as c', 'uc.cannabis_id', 'c.id')
        .where('c.id', id) 
}

function addPreferrences(user_id, cannabis_id) {
    return db('users_cannabis').insert({ user_id, cannabis_id })
}

function find(strain) {
    return db('cannabis').where({ strain })
}

function add(cannabis) {
    return db('cannabis').insert(cannabis).returning('id')
}


