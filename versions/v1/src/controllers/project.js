import { Project } from '../../infra/database/models';

class ProjectController {

  async getProject(ctx) {
    //const { projectName } = ctx.query;
    await Project.find();

  }

}

export default new ProjectController();