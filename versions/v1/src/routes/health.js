import KoaRouter from 'koa-router';

const healthRouter = new KoaRouter();

healthRouter.get('/health', async (ctx) => {
  // TODO see if database is UP
  ctx.body = { state: 'OK' };
});

export default healthRouter;