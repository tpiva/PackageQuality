import log4js from 'log4js';
const log = log4js.getLogger('error');

export default async function (ctx, next) {
  try {
    await next();
  } catch (error) {
    log.error(JSON.stringify(error));
    ctx.status = error.status || 500;
    ctx.body = error.message;
    ctx.app.emit('error', error, ctx);
  }
}
