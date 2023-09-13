const express = require('express');
const { readAllTasks } = require('../controllers/read');

const route = express.Router();

route.get('/all',readAllTasks)

module.exports.readRoute = route; 