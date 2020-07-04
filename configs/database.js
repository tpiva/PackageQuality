require('dotenv').config();

const dialect = 'postgres';
const host = process.env.POSTGRES_URL || 'localhost';
const username = process.env.POSTGRES_USERNAME || 'postgres';
const password = process.env.POSTGRES_PASSWORD || 'postgres';
const database = process.env.POSTGRES_DATABASE || 'lib_quality';
const define = {
  timestamps: true,
  undescored: true
};

module.exports =  {
  dialect,
  host,
  username,
  password,
  database,
  define
};