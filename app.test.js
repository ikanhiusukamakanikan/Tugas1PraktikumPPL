const request = require('supertest');
const app = require('./app');

let createdTaskId;

// GET all (awal kosong / tetap 200)
test('GET /api/tasks - should return all tasks', async () => {
  const res = await request(app).get('/api/tasks');

  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe('success');
  expect(Array.isArray(res.body.data)).toBe(true);
});

// POST create task
test('POST /api/tasks - should create new task', async () => {
  const res = await request(app)
    .post('/api/tasks')
    .send({ title: 'Test Task' });

  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe('success');
  expect(res.body.data.title).toBe('Test Task');

  createdTaskId = res.body.data.id;
});

// GET by id
test('GET /api/tasks/:id - should return single task', async () => {
  const res = await request(app).get(`/api/tasks/${createdTaskId}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.data.id).toBe(createdTaskId);
});

// GET by id (NOT FOUND)
test('GET /api/tasks/:id - should return 404 if not found', async () => {
  const res = await request(app).get('/api/tasks/9999');

  expect(res.statusCode).toBe(404);
  expect(res.body.status).toBe('error');
});

// PUT update task
test('PUT /api/tasks/:id - should update task', async () => {
  const res = await request(app)
    .put(`/api/tasks/${createdTaskId}`)
    .send({
      title: 'Updated Task',
      completed: true
    });

  expect(res.statusCode).toBe(200);
  expect(res.body.data.title).toBe('Updated Task');
  expect(res.body.data.completed).toBe(true);
});

// PUT (NOT FOUND)
test('PUT /api/tasks/:id - should return 404 if not found', async () => {
  const res = await request(app)
    .put('/api/tasks/9999')
    .send({ title: 'Fail' });

  expect(res.statusCode).toBe(404);
});

// DELETE task
test('DELETE /api/tasks/:id - should delete task', async () => {
  const res = await request(app).delete(`/api/tasks/${createdTaskId}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe('Deleted');
});

// DELETE (NOT FOUND tetap aman)
test('DELETE /api/tasks/:id - should handle delete non-existing', async () => {
  const res = await request(app).delete('/api/tasks/9999');

  expect(res.statusCode).toBe(404);
  expect(res.body.status).toBe('error');
});