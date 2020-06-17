const knex = require('knex')

const config = require('../knexfile')

const environment = process.env.ENVIRONMENT

const db = knex(config[environment])

module.exports = db