import KoaRouter from 'koa-router';
import SchedulerController from '../controllers/scheduler';

const schedulerRouter = new KoaRouter();

schedulerRouter.post('/scheduler/sync', SchedulerController.syncAll);

export default schedulerRouter;