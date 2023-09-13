const express = require('express');

const { updateTask } = require('../controllers/update');

const route = express.Router();

route.put('/:id',updateTask)

module.exports.updateRoute = route; 