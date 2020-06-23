// Update with your config settings.
const databasePW = require("./config/databasepw")
const pgConnection = process.env.DATABASE_URL

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: pgConnection,
      port: 5433,
      database: 'users',
      user: 'postgres',
      password: process.env.DATABASE_PW
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  production: {
    client: 'postgresql',
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }

};
