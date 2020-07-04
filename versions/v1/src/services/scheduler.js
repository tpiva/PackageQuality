import { syncAll } from '../factories';

class SchedulerController {

  startSync() {
    // start sync and return without wait to finish
    syncAll();
  }
}

export default SchedulerController;