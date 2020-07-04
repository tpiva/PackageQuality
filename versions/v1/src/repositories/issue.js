import log4js from 'log4js';
import models from 'server/database/models';
import { omit } from 'lodash';

const log = log4js.getLogger('issue-repository');

class IssueRespository {

  async create(issue) {
    let newIssue;
    try {
      newIssue = await models.Issue.create(issue);
    } catch (error) {
      log.error(JSON.stringify(error));
    }

    return newIssue;
  }

  async update(issue) {
    let updateIssue;
    try {
      updateIssue = await models.Issue.update(omit(issue, 'id'), {
        where: {
          id: issue.id
        }
      });
    } catch (error) {
      log.error(JSON.stringify(error));
    }

    return updateIssue;
  }

  async createOrUpdate(issue) {
    const storagedIssue = await models.Issue.findOne({
      where: {
        id: issue.id
      }
    });
    if (storagedIssue) {
      return await this.update(issue);
    } else {
      return await this.create(issue);
    }
  }

  async findAll(page, limit, query) {
    const offset = page * limit;
    const { rows, count } = await models.Issue.findAndCountAll({
      where: query,
      limit,
      offset
    });
    
    if (offset >= count) {
      return [];
    } else {
      return rows.concat(await this.findAll(page + 1, limit, query));
    }
  }

  async count(query) {
    const count = await models.Issue.count(query);
    return count;
  }

  async findOne(query) {
    const issue = await models.Issue.findOne(query);
    return issue;
  }

  async getClosedIssuesByDay(projectId) {
    const issues = await models.sequelize.query(
      'SELECT date_trunc(\'day\', "closedTime") as day, count(1) FROM public."Issues" ' +
      'WHERE "projectId" = $1 GROUP BY 1 ORDER BY day ASC', {
        bind: [projectId],
        type: models.sequelize.QueryTypes.SELECT
      });

    return issues;
  }
}

export default new IssueRespository();