import Koa from 'koa';
import KoaRouter from 'koa-router';
import { configureLogger } from '../logger/logger';
import cors from '@koa/cors';

export default async () => {
  configureLogger();
  const app = await init();
  return app;
};

async function init() {
  const app = new Koa();
  app.use(cors());

  // Root of the application
  const appRouter = new KoaRouter();
  appRouter.get('/', async (ctx) => {
    ctx.body = { state: 'Server is running...' };
  });
  app.use(appRouter.routes());

  return app;
}