import { ProjectRepository } from '../../src/repositories';
import ProjectService from '../../src/services/project';
import sinon from 'sinon';

describe('Project Service', () => {
  let stub;

  before(() => {
    stub = sinon.stub(ProjectRepository, 'findAll').returns([
      {
        id: 1234,
        issues: 10,
        avg: 2,
        std: 3,
      }
    ]);
  });

  after(() => {
    stub.restore();
  });

  it('Should return a list of projects', async () => {
    const service = new ProjectService();
    const project = await service.getMetrics('angular');
    expect(project.length).to.equal(1);
  });
});