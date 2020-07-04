import {Calculate, Request} from '../utils';
import {IssueRepository, ProjectRepository} from '../repositories';
import { map, pick, split } from 'lodash';
import config from 'configs';
import log4js from 'log4js';

const log = log4js.getLogger('project-view');

class ProjectView {

  async sync() {
    try {
      log.info('Syncing projects from github API');
      const repositories = split(config.PROJECT_REPOSITORIES, ',');
      for (const repository of repositories) {
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

        await ProjectRepository.createOrUpdate({
          id: data.id,
          name: data.name
        });
      }
      log.info('Finished sync project from github API');
    } catch (error) {
      log.error('Error during sync of projectView...');
      log.error(JSON.stringify(error));
    }
    
  }

  async updateMetrics() {
    try {
      const projects = await ProjectRepository.findAll({ attributes: ['id', 'name'] });
      
      for (const project of projects) {
        const totalIssue = await IssueRepository.count({ where: { projectId: project.id }});
        const issues = await IssueRepository.findAll(0, 25, { projectId: project.id });
        const fixedTimes = map(issues, issue => issue.fixedTime);
        const avgTimeIssue = Calculate.avg(fixedTimes);
        const stdTimeIssue = Calculate.standartDeviation(fixedTimes, avgTimeIssue);
        
        await ProjectRepository.update({ 
          id: project.id,
          totalIssues: totalIssue,
          avgTimeIssue,
          stdTimeIssue
        });
      }
    } catch (error) {
      log.error('Error during updateMetrics of projectView...');
      log.error(JSON.stringify(error));
    }
  }

}

export default new ProjectView();