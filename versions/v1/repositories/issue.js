import models from 'server/database/models';
import { omit } from 'lodash';

class IssueRespository {

  async create(issue) {
    let newIssue;
    try {
      newIssue = await models.Issue.create(issue);
    } catch(error) {
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
    } catch(error) {
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
}

export default new IssueRespository();