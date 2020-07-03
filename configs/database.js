const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const ENV = process.env.NODE_ENV || 'development';
const {
  POSTGRES_PASSWORD,
  POSTGRES_USERNAME,
  POSTGRES_URL,
  POSTGRES_DATABASE
} = require(path.join(__dirname, ENV));

const dialect = 'postgres';
const host = POSTGRES_URL || 'localhost';
const username = POSTGRES_USERNAME || 'postgres';
const password = POSTGRES_PASSWORD || 'postgres';
const database = POSTGRES_DATABASE || 'lib_quality';
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