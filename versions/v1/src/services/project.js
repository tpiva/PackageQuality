import { ProjectRepository } from '../../repositories';

class ProjectService {

  async getMetrics(projectName) {
    const entity = await ProjectRepository.findOne({
      where: {
        name: projectName
      }
    });
    const project = {
      id: entity.id,
      issues: entity.openIssues,
      avg: entity.avgTimeIssue,
      std: entity.stdTimeIssue,
    };

    return project;
  }
}

export default ProjectService;