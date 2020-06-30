import KoaRouter from 'koa-router';

const projectRouter = new KoaRouter();

projectRouter.get('/project');

export default projectRouter;