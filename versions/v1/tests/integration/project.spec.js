import { IssueRepository } from '../../src/repositories';
import ProjectService from '../../src/services/project';
import createServer from 'helpers/app';
import sinon from 'sinon';

const mockData = require('../__mock__/project_history.json');

describe('Project endpoint', () => {
  let request;

  before(async () => {
    request = await createServer();
  });

  describe('GET /v1/projects', () => {
    
    it('Should return a list of projects with only one', async () => {
      const response = await request.get('/v1/projects?projectName=angular')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response).to.be.a('object');
      expect(response.body.success).to.be.true;
      expect(response.body.data.length).to.equal(1);
      expect(response.body.data[0]).to.deep.equal({
        id: 24195339,
        issues: null,
        avg: null,
        std: null,
      });
    });

    it('Should return a list of projects ', async () => {
      const response = await request.get('/v1/projects')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response).to.be.a('object');
      expect(response.body.success).to.be.true;
      expect(response.body.data.length).to.equal(3);
    });

    it('Should return error', async () => {
      const stub = sinon.stub(ProjectService.prototype, 'getMetrics').rejects(new Error('Service failed!'));
      const response = await request.get('/v1/projects')
        .expect(500);

      expect(response.text).to.equal('Service failed!');
      stub.restore();
    });
  });

  describe('GET /v1/projects/history', () => {
    const issues = [];

    before(async () => {
      for (const mock of mockData) {
        const issue = await IssueRepository.create(mock);
        issues.push(issue);
      }
    });

    after(async () => {
      for (const issue of issues) {
        await issue.destroy();
      }
    });
    
    it('Should return an array with issues historic by project', async () => {
      const response = await request.get('/v1/projects/history?projectNames=react')
        .expect(200)
        .expect('Content-Type', /json/);

      console.log(response);
      expect(response).to.be.a('object');
      expect(response.body.success).to.be.true;
      expect(response.body.data.react.length).to.equal(3);
      expect(response.body.data.react[0].day).to.exist;
      expect(response.body.data.react[0].count).to.exist;
    });

    it('Should return an array with issues historic by projects', async () => {
      const response = await request.get('/v1/projects/history?projectNames=angular,vue,react')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response).to.be.a('object');
      expect(response.body.success).to.be.true;
      expect(response.body.data.react).to.be.a('array');
      expect(response.body.data.angular).to.be.a('array');
      expect(response.body.data.vue).to.be.a('array');
      expect(response.body.data.react.length).to.equal(3);
      expect(response.body.data.angular.length).to.equal(3);
      expect(response.body.data.vue.length).to.equal(0);
    });
  });

});