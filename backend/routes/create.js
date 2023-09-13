const express = require('express');

const { createTask } = require('../controllers/Create');

const route = express.Router();

route.post('/',createTask)

module.exports.createRoute = route; 