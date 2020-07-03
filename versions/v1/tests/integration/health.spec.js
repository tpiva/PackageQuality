import createServer from 'helpers/app';

describe('Health endpoint', () => {
  let request;

  before(async () => {
    request = await createServer();
  });

  it('GET /v1/health', async () => {
    it('Should return a state of api', async () => {
      await request.get('/')
        .expect(200, 'OK');
    });
  });
});