import config from '../../configs';
import http from 'http';
import log4js from 'log4js';
import server from '../infra/init/server';

const log = log4js.getLogger('app-server');
const {
  API_PORT,
  NODE_ENV
} = config;

server().then(app => {
  
  // Starting both http & https servers
  const httpServer = http.createServer(app.callback());
  
  httpServer.listen(API_PORT, () => {
    log.info(`Server listening on ${API_PORT} in ${NODE_ENV} environment`);
  });

}, err => {
  log.error('Error while starting up server', err);
  process.exit(1);
});
