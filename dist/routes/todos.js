"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
});
router.put('/todo/:id', (req, res, next) => {
    const params = req.params;
    const tid = params.id;
    const body = req.body;
    const tod = todos.findIndex(todoItem => todoItem.id === tid);
    if (tod >= 0) {
        todos[tod] = { id: todos[tod].id, text: body.text };
        res.status(200).json({ message: 'updated todos', todos: todos });
    }
    res.status(404).json({ message: 'item not found ' });
});
router.delete('/todo/:id', (req, res, next) => {
    const params = req.params;
    const tid = params.id;
    const tod = todos.findIndex(todoItem => todoItem.id === tid);
    if (tod >= 0) {
        // const del=todos[tod]
        todos.splice(tod, 1);
        res.json({ message: "deleted successfully", todos: todos });
    }
    res.status(404).json({ message: "item not found " });
});
exports.default = router;
