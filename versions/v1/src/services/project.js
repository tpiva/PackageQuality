import { ProjectRepository } from '../../repositories';
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
}

export default ProjectService;