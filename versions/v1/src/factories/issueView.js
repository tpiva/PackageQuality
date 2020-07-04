import { IssueRepository, ProjectRepository } from '../repositories';
import { Request, Times } from '../utils';
import { find, includes, split } from 'lodash';
import ProjectView from './projectView';
import config from 'configs';
import log4js from 'log4js';

const log = log4js.getLogger('issue-view');

class IssueView {

  async sync() {
    try {
      const repositories = split(config.PROJECT_REPOSITORIES, ',');
      const projects = await ProjectRepository.findAll({ attributes: ['id', 'name'] });
      for (const project of projects) {
        const repositoryPath = find(repositories, repository => includes(repository, project.name));
        if (repositoryPath) {
          const latestIssue = await IssueRepository.findOne({
            where: { projectId: project.id },
            attributes: [ 'createdTime' ],
            order: [['createdTime', 'DESC']]
          });

          // find lasted inserted
          const sinceParam = latestIssue && latestIssue !== null ? latestIssue.createdTime : '2020-06-30T19:10:27Z';
          await this._download(repositoryPath, project.id, 1, sinceParam);
        }
        
      }
    } catch (error) {
      log.error('Error during sync of issueView...');
      log.error(JSON.stringify(error));
    }
  }

  async _download(repositoryPath, projectId, page, sinceParam) {
    try {
      let result = 0;

      do {
        result = await Request.do({
          baseURL: config.GITHUB_API_BASE_URL
        }, {
          method: 'GET',
          url: `repos/${repositoryPath}/issues?page=${page}&state=closed&per_page=100&since=${sinceParam}`,
          headers: {
            authorization: `Bearer ${config.GITHUB_TOKEN}`
          }
        });
    
        for (const issue of result) {
          await IssueRepository.createOrUpdate({
            id: issue.id,
            state: issue.state,
            createdTime: Date.parse(issue.created_at),
            closedTime: issue.closed_at !== null ? Date.parse(issue.closed_at) : null,
            projectId: projectId,
            fixedTime: issue.closed_at !== null ?
              Times.timeInDays(issue.created_at, issue.closed_at) : 0
          });
        }

        page += 1;
      } while (Array.isArray(result) && result.length > 0);
      
      await ProjectView.updateMetrics();
    } catch (error) {
      return;
    }
  }
}

export default new IssueView();