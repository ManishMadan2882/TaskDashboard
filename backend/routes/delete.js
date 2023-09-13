const express = require('express');

const { deleteTask } = require('../controllers/delete');

const route = express.Router();

route.delete('/:id',deleteTask)

module.exports.deleteRoute = route; 