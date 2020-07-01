import ProjectService from '../services/project';

class ProjectController {

  async getProject(ctx) {
    const { projectName } = ctx.query;

    const service = new ProjectService();
    const entity = await service.getMetrics(projectName);

    ctx.body = ctx.success({data: entity});
  }

}

export default new ProjectController();