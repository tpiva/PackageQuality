import Sequelize from 'sequelize';

const dbConfig = require('../../../configs/database');
const connection = new Sequelize(dbConfig);

export default connection;