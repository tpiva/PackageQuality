import { IssueRepository, ProjectRepository } from '../repositories';
import { Op } from 'sequelize';
import { map } from 'lodash';

class ProjectService {

  async getMetrics(projectName) {
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
  }

  async getHistory(projectsName) {
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
  }
}

export default ProjectService;