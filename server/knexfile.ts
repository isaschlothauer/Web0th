import type { Knex } from "knex";
import dotenv from 'dotenv';

// Update with your config settings.
dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST, 
      port: parseInt(process.env.DB_PORT!), 
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      extension: 'ts',
      directory:  "./db/migrations",
    }
  },

  staging: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST, 
      port: parseInt(process.env.DB_PORT!), 
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      extension: 'ts',
      directory:  "./db/migrations",
    }
  },

  production: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST, 
      port: parseInt(process.env.DB_PORT!), 
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      extension: 'ts',
      directory:  "./db/migrations",
      
    }
  }
};

module.exports = config;


