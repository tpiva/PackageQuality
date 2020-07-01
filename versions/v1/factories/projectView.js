import {Calculate, Request} from '../utils';
import {IssueRepository, ProjectRepository} from '../repositories';
import { map, omit, pick, split } from 'lodash';
import config from 'configs';

class ProjectView {

  static async sync() {
    const repositories = split(config.PROJECT_REPOSITORIES, ',');
    const projects = await Promise.all(map(repositories, async repository => {
      const result = await Request.do({
        baseURL: config.GITHUB_API_BASE_URL
      }, {
        method: 'GET',
        url: `repos/${repository}`,
        headers: {
          authorization: `Bearer ${config.GITHUB_TOKEN}`
        }
      });

      const data = pick(result, [
        'id', 'name', 'full_name', 'open_issues'
      ]);

      return ProjectRepository.createOrUpdate({
        id: data.id,
        name: data.name,
        openIssues: data.open_issues
      });
    }));

    return projects;
  }

  static async updateMetrics() {
    const projects = await ProjectRepository.findAll();
    
    for (const project of projects) {
      const issues = await IssueRepository.findAll(0, 25, { projectId: project.id });
      const fixedTimes = map(issues, issue => issue.fixedTime);
      const avgTimeIssue = Calculate.avg(fixedTimes);
      const stdTimeIssue = Calculate.standartDeviation(fixedTimes, avgTimeIssue);
      
      await ProjectRepository.update({ 
        id: project.id,
        avgTimeIssue,
        stdTimeIssue
      });
    }
  }

}

export default ProjectView;