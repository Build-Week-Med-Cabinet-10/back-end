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
}

function checkIfInPreferrences(id) {
    return db('users as u')
        .join('users_cannabis as uc', 'u.id', 'uc.user_id')
        .join('cannabis as c', 'uc.cannabis_id', 'c.id')
        .where('c.id', id) 
}

function addPreferrences(user_id, cananbis_id) {
    return db('users_cannabis').insert({ user_id, cannabis_id })
}

function find(name) {
    return db('cannabis').where({ name })
}

function add(cannabis) {
    return db('cannabis').insert(cannabis)
}
// function add(cannabis, id) {
//     return db('cannabis').insert(cannabis)
//         .then(() => {
//             return db('users_cannabis').insert({ user_id: id, cannabis_id: })
//         } )
// }

