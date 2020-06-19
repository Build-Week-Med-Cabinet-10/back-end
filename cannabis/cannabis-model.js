const db = require('../data/dbconfig')

module.exports = {
    add,
    getPreferrences
}

function getPreferrences(email) {
    return db('users as u')
        .join('users_cannabis as uc', 'u.id', 'c.user_id')
        .join('cannabis as c', 'uc.cannabis_id', 'c.id')
        .where({ email })
    
}

function add(cannabis) {
    return db('cannabis').insert(cannabis)
        .then(() => cannabis )
}

