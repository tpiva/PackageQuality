import KoaRouter from 'koa-router';
import ProjectController from '../controllers/project';

const projectRouter = new KoaRouter();

projectRouter.get('/projects', ProjectController.getProject);

export default projectRouter;