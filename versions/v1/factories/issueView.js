import { IssueRepository, ProjectRepository } from '../repositories';
import { Request, Times } from '../utils';
import { find, forEach, includes, isEmpty, map, split } from 'lodash';
import config from 'configs';

class IssueView {

  static async sync() {
    const repositories = split(config.PROJECT_REPOSITORIES, ',');
    const projects = await ProjectRepository.findAll();
    await Promise.all(map(projects, async project => {
      const repositoryPath = find(repositories, repository => includes(repository, project.name));

      await this._download(repositoryPath, project.id, 1);
      return {};
    }));
  }

  static async _download(repositoryPath, projectId, page) {
    try {
      const result = await Request.do({
        baseURL: config.GITHUB_API_BASE_URL,
        maxAge: 15 * 60 * 1000
      }, {
        method: 'GET',
        url: `repos/${repositoryPath}/issues?page=${page}&state=closed&per_page=1000`,
        headers: {
          authorization: `Bearer ${config.GITHUB_TOKEN}`
        }
      });
  
      if (!result || isEmpty(result)) {
        return;
      }
      else {
        await Promise.all(forEach(result, async issue => {
          await IssueRepository.createOrUpdate({
            id: issue.id,
            state: issue.state,
            createdTime: Date.parse(issue.created_at),
            closedTime: Date.parse(issue.closed_at),
            projectId: projectId,
            fixedTime: Times.timeInDays(issue.created_at, issue.closed_at)
          });
        }));

        this._download(repositoryPath, projectId, page + 1);
      }
    } catch (error) {
      return;
    }
  }
}

export default IssueView;