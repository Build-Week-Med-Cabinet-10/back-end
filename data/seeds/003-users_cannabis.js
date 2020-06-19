
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE TABLE users_cannabis CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('users_cannabis').insert([
        { user_id: 1, cannabis_id: 1 },
        { user_id: 1, cannabis_id: 2 },
        { user_id: 2, cannabis_id: 3 }
      ]);
    });
};
