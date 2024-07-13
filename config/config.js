require('dotenv').config();

module.exports = {
  "development": {
    "username": "postgres",
    "password": "admin",
    "database": "simple-crud",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "url": process.env.DB_URL,
    "dialect": "postgres"
  },
  "production": {
    "url": process.env.DB_URL,
    "dialect": "postgres"
  }
};
