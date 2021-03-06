import log4js from 'log4js';
import schedule from 'node-schedule';

const log = log4js.getLogger('jobs-scheduler');

class Scheduler {

  start(factory) { 
    // run every midnight to update project and issues of the day.
    // for tests */5 * * * *
    // this.job = schedule.scheduleJob('*/5 * * * *', factory);
    this.job = schedule.scheduleJob('0 0 * * *', factory);
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