import log4js from 'log4js';
import schedule from 'node-schedule';

const log = log4js.getLogger('jobs-scheduler');

class Scheduler {

  start(factory) { 
    this.job = schedule.scheduleJob('*/1 * * * *', factory);
  }

  stop() {
    try {
      if (this.job) {
        this.job.cancel();
      }
    } catch (error) {
      log.error(error);
    }
  }

}

export default new Scheduler();