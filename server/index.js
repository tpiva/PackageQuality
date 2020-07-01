const path = require('path');
const appModulePath = require('app-module-path');
appModulePath.addPath(__dirname);
appModulePath.addPath(path.join(__dirname, '/..'));
require('./server');