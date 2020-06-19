
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE TABLE cannabis CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('cannabis').insert([
        {strain: 'blue dream', effect: 'day dreamy', flavor: 'blue'},
        {strain: 'pineapple express', effect: 'adventurous', flavor: 'pine apple'},
        {strain: 'OG kush', effect: 'bonkers', flavor: 'smokey buorbon'}
      ]);
    });
};
