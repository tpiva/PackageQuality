import KoaRouter from 'koa-router';

const healthRouter = new KoaRouter();

healthRouter.get('/health', async (ctx) => {
  ctx.body = { state: 'OK' };
});

export default healthRouter;