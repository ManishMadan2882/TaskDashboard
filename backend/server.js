require ('dotenv').config();
require('mongoose')
const express  = require('express');
const { createRoute } = require('./routes/create');
const { readRoute } = require('./routes/read');
const { updateRoute } = require('./routes/update');
const { deleteRoute } = require('./routes/delete');

const app = express();

const port = 5400;

app.use(express.json());

app.use('/api/create',createRoute)
app.use('/api/read',readRoute)
app.use('/api/update',updateRoute)
app.use('/api/delete',deleteRoute)

app.listen(port,
    ()=>console.log(`Server running at port ${port}`));