"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body; // Type assertion
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newTodo);
    res
        .status(201)
        .json({ message: 'Created the todo.', createdTodo: newTodo, todos: todos });
});
router.put('/todo/:todoId', (req, res, next) => {
    const body = req.body; // Type assertion
    const params = req.params; // Type assertion
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
    const params = req.params; // Type assertion
    todos = todos.filter((todo) => todo.id !== params.todoId);
    res.status(200).json({ message: 'Todo deleted!', todos: todos });
});
exports.default = router;
