import Koa from 'koa';
import KoaRouter from 'koa-router';
import { configureLogger } from './logger/logger';
import cors from '@koa/cors';
import versions from './versions';

import factory from '../versions/v1/factories/projectView';

export default async () => {
  configureLogger();
  const app = await init();

  await factory.updateMetrics();
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

  for (const config of versions) {
    const router = new KoaRouter({
      prefix: config.basePath
    });
    config.routes(router);
    app.use(router.routes());
  }

  return app;
}