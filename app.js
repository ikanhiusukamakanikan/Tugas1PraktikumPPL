const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];
let id = 1;

// GET
app.get('/api/tasks', (req, res) => {
  res.json({ status: 'success', data: tasks });
});

// POST
app.post('/api/tasks', (req, res) => {
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
  if (!task) return res.status(404).json({ status: 'error', message: 'Not found' });

  task.title = req.body.title ?? task.title;
  task.completed = req.body.completed ?? task.completed;

  res.json({ status: 'success', data: task });
});

// DELETE
app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ status: 'success', message: 'Deleted' });
});

app.listen(3000, () => console.log('Running on port 3000'));

module.exports = app;