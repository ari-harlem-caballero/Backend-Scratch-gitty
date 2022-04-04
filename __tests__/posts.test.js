const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should not allow unauthorized user to POST', async () => {
    const res = await request(app)
      .get('/api/v1/posts');

    expect(res.body).toEqual({
      message: 'Must be signed in to create a post',
      status: 401
    });
  });
});
