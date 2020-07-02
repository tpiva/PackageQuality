import { IssueRepository, ProjectRepository } from '../repositories';
import { Request, Times } from '../utils';
import { find, forEach, includes, split } from 'lodash';
import ProjectView from './projectView';
import config from 'configs';

class IssueView {

  static async sync() {
    const repositories = split(config.PROJECT_REPOSITORIES, ',');
    const projects = await ProjectRepository.findAll();
    await Promise.all(forEach(projects, async project => {
      const repositoryPath = find(repositories, repository => includes(repository, project.name));

      await this._download(repositoryPath, project.id, 1);
    }));
  }

  static async _download(repositoryPath, projectId, page) {
    try {
      let result = 0;

      do {
        // find lasted inserted
        const latestIssue = await IssueRepository.findOne({
          attributes: [ 'createdTime' ],
          order: [['createdTime', 'DESC']]
        });
        const sinceParam = latestIssue ? latestIssue.createdTime : '2020-06-01T19:10:27Z';
        result = await Request.do({
          baseURL: config.GITHUB_API_BASE_URL,
          maxAge: 15 * 60 * 1000
        }, {
          method: 'GET',
          url: `repos/${repositoryPath}/issues?page=${page}&state=closed&per_page=100&since=${sinceParam}`,
          headers: {
            authorization: `Bearer ${config.GITHUB_TOKEN}`
          }
        });
    
        await Promise.all(forEach(result, async issue => {
          await IssueRepository.createOrUpdate({
            id: issue.id,
            state: issue.state,
            createdTime: Date.parse(issue.created_at),
            closedTime: Date.parse(issue.closed_at),
            projectId: projectId,
            fixedTime: issue.closed_at !== null ?
              Times.timeInDays(issue.created_at, issue.closed_at) : 0
          });
        }));

        page += 1;
      } while (Array.isArray(result) && result.length > 0);
      
      await ProjectView.updateMetrics();
    } catch (error) {
      return;
    }
  }
}

export default IssueView;