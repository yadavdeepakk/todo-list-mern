const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/todolist');

const TodoSchema = new mongoose.Schema({
  text: String,
  isCompleted: Boolean,
});

const Todo = mongoose.model('Todo', TodoSchema);

// CRUD APIs

// Get all todos
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add todo
app.post('/todos', async (req, res) => {
  const todo = new Todo({ text: req.body.text, isCompleted: false });
  await todo.save();
  res.json(todo);
});

// Update todo
app.put('/todos/:id', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
  res.json(todo);
});

// Delete todo
app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
