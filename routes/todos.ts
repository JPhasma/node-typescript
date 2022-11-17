import { Router } from 'express';
import { Todo } from '../models/todo';

type RequestBody = { text: string }; // Type alias
type RequestParams = { todoId: string }; // Type alias

let todos: Todo[] = [];
const router = Router();

router.get('/', (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post('/todo', (req, res, next) => {
  const body = req.body as RequestBody; // Type assertion
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };

  todos.push(newTodo);
  res
    .status(201)
    .json({ message: 'Created the todo.', createdTodo: newTodo, todos: todos });
});

router.put('/todo/:todoId', (req, res, next) => {
  const body = req.body as RequestBody; // Type assertion
  const params = req.params as RequestParams; // Type assertion

  const tid = params.todoId;
  const todoIndex = todos.findIndex((todo) => todo.id === tid);

  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
    return res.status(200).json({
      message: 'Updated!',
      updatedTodo: todos[todoIndex],
      todos: todos,
    });
  }
  res.status(404).json({ message: 'Could not find todo for this id.' });
});

router.delete('/todo/:todoId', (req, res, next) => {
  const params = req.params as RequestParams; // Type assertion
  todos = todos.filter((todo) => todo.id !== params.todoId);
  res.status(200).json({ message: 'Todo deleted!', todos: todos });
});

export default router;
