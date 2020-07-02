import { handlerError, handlerSuccess } from './middlewares';
import Koa from 'koa';
import KoaRouter from 'koa-router';
import { configureLogger } from './logger/logger';
import cors from '@koa/cors';
import { oas } from 'koa-oas3';
import versions from './versions';
export default async () => {
  configureLogger();
  const app = await init();
  return app;
};

async function init() {
  const app = new Koa();
  app.use(cors());
  app.use(handlerError);
  app.use(handlerSuccess);

  // Root of the application
  const appRouter = new KoaRouter();
  appRouter.get('/', async (ctx) => {
    ctx.body = { state: 'Server is running...' };
  });

  app.use(appRouter.routes());

  for (const config of versions) {
    app.use(oas({
      spec: config.swaggerConfig,
      endpoint: `${config.basePath}/openapi.json`,
      uiEndpoint: `${config.basePath}/swagger`,
      validateResponse: true
    }));
    const router = new KoaRouter({
      prefix: config.basePath
    });
    config.routes(router);
    app.use(router.routes());
  }

  return app;
}