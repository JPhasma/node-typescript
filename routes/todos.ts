import { Router } from 'express';
import { Todo } from '../models/todo';

let todos: Todo[] = [];
const router = Router();

router.get('/', (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post('/todo', (req, res, next) => {
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: req.body.text,
  };

  todos.push(newTodo);
  res
    .status(201)
    .json({ message: 'Created the todo.', createdTodo: newTodo, todos: todos });
});

router.put('/todo/:todoId', (req, res, next) => {
  const tid = req.params.todoId;
  const todoIndex = todos.findIndex((todo) => todo.id === tid);

  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
    return res.status(200).json({
      message: 'Updated!',
      updatedTodo: todos[todoIndex],
      todos: todos,
    });
  }
  res.status(404).json({ message: 'Could not find todo for this id.' });
});

router.delete('/todo/:todoId', (req, res, next) => {
  todos = todos.filter((todo) => todo.id !== req.params.todoId);
  res.status(200).json({ message: 'Todo deleted!', todos: todos });
});

export default router;