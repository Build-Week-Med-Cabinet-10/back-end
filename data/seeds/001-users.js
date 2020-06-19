const bcrypt = require('bcryptjs')

const password = bcrypt.hashSync('secretword123', 8)
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE TABLE users CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'thom27', email: 'thom27@yahoo.com', password },
        {username: 'pauleen29', email: 'pauleen29@yahoo.com', password },
        {username: 'meemo13', email: 'meemo13@yahoo.com', password }
      ]);
    });
};
