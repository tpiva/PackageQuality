import log4js from 'log4js';

const configureLogger = () => {
  log4js.configure({
    appenders: { out: { type: 'stdout' } },
    categories: { default: { appenders: ['out'], level: 'info' } }
  });
};

export {
  configureLogger
};