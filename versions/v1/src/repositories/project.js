import log4js from 'log4js';
import models from 'server/database/models';
import { omit } from 'lodash';

const log = log4js.getLogger('issue-repository');

class ProjectRespository {

  async create(project) {
    let newProject;
    try {
      newProject = await models.Project.create(project);
    } catch (error) {
      log.error(JSON.stringify(error));
    }

    return newProject;
  }

  async update(project) {
    let updateProject;
    try {
      updateProject = await models.Project.update(omit(project, 'id'), {
        where: {
          id: project.id
        }
      });
    } catch (error) {
      log.error(JSON.stringify(error));
    }

    return updateProject;
  }

  async createOrUpdate(project) {
    const storagedProject = await models.Project.findOne({
      where: {
        id: project.id
      }
    });
    if (storagedProject) {
      return await this.update(project);
    } else {
      return await this.create(project);
    }
  }

  async findAll(options = {}) {
    const projects = await models.Project.findAll(options);

    return projects;
  }

  async findOne(query) {
    const issue = await models.Project.findOne(query);
    return issue;
  }
}

export default new ProjectRespository();