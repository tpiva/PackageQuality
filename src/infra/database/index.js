import { Issue, Project } from './models';
import Sequelize from 'sequelize';

const dbConfig = require('../../../configs/database');
const connection = new Sequelize(dbConfig);

Issue.init(connection);
Project.init(connection);

export default connection;