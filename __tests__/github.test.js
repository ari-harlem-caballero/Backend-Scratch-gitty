const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github.js', () => {
  return {
    exchangeCodeForToken: async (_code) => 'MOCKED_TOKEN',
    getGithubProfile: async (_token) => ({
      username: 'ariIsBest',
      email: 'fake@email.com',
      avatar_url: 'https://photo.com/photo.jpg',
    }),
  };
});

describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should redirect to GitHub OAuth page on signup/signin', async () => {
    const res = await request(app).get('/api/v1/github/login');

    expect(res.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback/i
    );
  });

  it('it should be able to sign in and redirect users to /posts', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);

    expect(res.req.path).toEqual('/api/v1/posts');
  });

  it('should be able to delete a users cookie/logs out', async () => {
    const agent = request.agent(app);
    
    await agent
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);

    const res = await agent
      .delete('/api/v1/github');

    expect(res.body).toEqual({
      message: 'Signed out successfully!',
      success: true,
    });
  });
});
