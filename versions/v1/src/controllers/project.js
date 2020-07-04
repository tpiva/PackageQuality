import ProjectService from '../services/project';
import log4js from 'log4js';
import { split } from 'lodash';

const log = log4js.getLogger('project-service');

class ProjectController {

  async getProject(ctx) {
    log.info('Entering in get project...');
    const { projectName } = ctx.query;

    const service = new ProjectService();
    const entity = await service.getMetrics(projectName);

    ctx.body = ctx.success({data: entity});
  }

  async getHistory(ctx) {
    log.info('Entering in get history...');
    const { projectNames } = ctx.query;
    const projects = split(projectNames, ',');

    const service = new ProjectService();
    const entities = await service.getHistory(projects);

    ctx.body = ctx.success({data: entities});
  }

}

export default new ProjectController();