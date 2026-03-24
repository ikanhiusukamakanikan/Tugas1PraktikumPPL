const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];
let id = 1;

// GET ALL
app.get('/api/tasks', (req, res) => {
  res.json({ status: 'success', data: tasks });
});

// GET BY ID (WAJIB buat test kamu)
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({
      status: 'error',
      message: 'Task not found'
    });
  }

  res.json({ status: 'success', data: task });
});

// POST
app.post('/api/tasks', (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({
      status: 'error',
      message: 'Title is required'
    });
  }

  const task = {
    id: id++,
    title: req.body.title,
    completed: false
  };

  tasks.push(task);

  res.json({ status: 'success', data: task });
});

// PUT
app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({
      status: 'error',
      message: 'Task not found'
    });
  }

  task.title = req.body.title ?? task.title;
  task.completed = req.body.completed ?? task.completed;

  res.json({ status: 'success', data: task });
});

// DELETE
app.delete('/api/tasks/:id', (req, res) => {
  const exists = tasks.some(t => t.id == req.params.id);

  tasks = tasks.filter(t => t.id != req.params.id);

  if (!exists) {
    return res.status(404).json({
      status: 'error',
      message: 'Task not found'
    });
  }

  res.json({ status: 'success', message: 'Deleted' });
});

// ⬇️ penting untuk testing
if (require.main === module) {
  app.listen(3000, () => console.log('Running on port 3000'));
}

module.exports = app;