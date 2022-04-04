const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should not allow unauthorized user to POST', async () => {
    const res = await request(app)
      .post('/api/v1/posts')
      .send({ 
        title: 'World is on fire',
        text: '...and all is fine' 
      });

    expect(res.body).toEqual({
      message: 'You must be signed in!',
      status: 401
    });
  });

  it('should allow authorized user to POST', async () => {
    const agent = request.agent(app);

    await agent
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);

    const res = await agent
      .post('/api/v1/posts')
      .send({ 
        title: 'World is on fire',
        text: '...and all is fine' 
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'World is on fire',
      text: '...and all is fine',
      createdAt: expect.any(String)
    });
  });
});
