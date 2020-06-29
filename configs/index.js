import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const ENV = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, ENV));

export default config;