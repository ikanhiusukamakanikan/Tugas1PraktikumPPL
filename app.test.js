const request = require('supertest');
const app = require('./app');

test('GET /tasks', async () => {
  const res = await request(app).get('/api/tasks');
  expect(res.statusCode).toBe(200);
});