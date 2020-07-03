import { ProjectRepository } from '../../repositories';
import createServer from 'helpers/app';
import sinon from 'sinon';

describe('Project endpoint', () => {
  let request, stub;

  before(async () => {
    request = await createServer();

    stub = sinon.stub(ProjectRepository, 'findAll').returns([
      {
        id: 1234,
        openIssues: 10,
        avgTimeIssue: 2,
        stdTimeIssue: 3,
      }
    ]);
  });

  after(() => {
    stub.restore();
  });

  describe('GET /v1/projects', () => {
    
    it('Should return a list of projects ', async () => {
      const response = await request.get('/v1/projects')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response).to.be.a('object');
      expect(response.body.success).to.be.true;
      expect(response.body.data.length).to.equal(1);
      expect(response.body.data[0]).to.deep.equal({
        id: 1234,
        issues: 10,
        avg: 2,
        std: 3,
      });
    });
  });

});