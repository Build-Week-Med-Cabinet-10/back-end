
exports.up = function(knex) {
    return knex.schema
        .createTable('cannabis', tbl => {
            tbl.increments('id')
            tbl.string('strain', 128).notNullable()
            tbl.string('effect', 128).notNullable()
            tbl.string('flavor', 128).notNullable()
            tbl.string('type', 128)
            tbl.string('description', 255)
        })
        .createTable('users_cannabis', tbl => {
            tbl.increments('id')
            tbl.integer('user_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            tbl.integer('cannabis_id')
                .notNullable()
                .unsigned()
                .references('id')
                .inTable('cannabis')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
        })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users_cannabis')
    .dropTableIfExists('cannabis')
    
};
