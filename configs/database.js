const dialect = 'postgres';
const host = 'localhost';
const username = 'postgres';
const password = 'postgres';
const database = 'lib_quality';
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