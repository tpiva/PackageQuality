import { IssueRepository, ProjectRepository } from '../repositories';
import { Op } from 'sequelize';
import log4js from 'log4js';
import { map } from 'lodash';

const log = log4js.getLogger('src-project-services');

class ProjectService {

  async getMetrics(projectName) {
    try {
      let options = {};
      if (projectName) {
        options = {
          where: {
            name: projectName
          }
        };
      }

      const entities = await ProjectRepository.findAll(options);

      const projects = map(entities, entity => ({
        id: entity.id,
        issues: entity.openIssues,
        avg: entity.avgTimeIssue,
        std: entity.stdTimeIssue,
      }));

      return projects;
    } catch(error) {
      log.error(JSON.stringify(error));
      throw error;
    }
    
  }

  async getHistory(projectsName) {
    try {
      const listHistory = {};

      const projects = await ProjectRepository.findAll({
        where: {
          name: {
            [Op.in]: projectsName
          }
        },
        attributes: ['id', 'name']
      });

      for (const project of projects) {
        listHistory[project.name] = await IssueRepository.getClosedIssuesByDay(project.id);
      }

      return listHistory;
    } catch(error) {
      log.error(JSON.stringify(error));
    }
  }
}

export default ProjectService;