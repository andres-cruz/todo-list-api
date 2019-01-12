const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
    db.Todo.find()
    .then((todos) => {
        res.json(todos);
    })
    .catch((err) => {
        res.send(err);
    })
});

router.post('/', (req, res) => {
    db.Todo.create(req.body)
        .then((newTodo) => {
            res.status(201).json(newTodo);
        })
        .catch((err) => {
            res.send(err);
        }); 
});

router.get('/:todoId', (req, res) => {
    db.Todo.findById(req.params.todoId)
        .then((foundTodo) => {
            res.status(200).json(foundTodo);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put('/:todoId', (req, res) => {
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
        .then((updatedTodo) => {
            res.status(200).json(updatedTodo);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.delete('/:todoId', (req, res) => {
    db.Todo.findByIdAndDelete({_id: req.params.todoId})
        .then((deletedTodo) => {
            res.status(200).json(deletedTodo)
        })
        .catch((err) => {
            res.send(err)
        });
});

module.exports = router;