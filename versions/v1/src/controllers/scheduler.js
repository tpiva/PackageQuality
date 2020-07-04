import SchedulerService from '../services/scheduler';
import log4js from 'log4js';

const log = log4js.getLogger('scheduler-service');

class SchedulerController {
  
  async syncAll(ctx) {
    log.info('Entering in sync all...');

    const service = new SchedulerService();
    service.startSync();

    ctx.body = ctx.success();
  }

}

export default new SchedulerController();