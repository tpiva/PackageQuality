import { map, pick, split } from 'lodash';
import ProjectRepository from '../repositories/project';
import Request from '../utils/request';
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

}

export default ProjectView;