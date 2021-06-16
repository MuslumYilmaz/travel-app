const app = require('../server/server.js');
const supertest = require('supertest');
const request = supertest(app);

it('gets the test endpoint', async () => {
  const response = await request.get('/test')

  expect(response.status).toBe(200)
  expect(response.body.message).toBe('pass!')
})