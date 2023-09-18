require ('dotenv').config();
require('mongoose')
const express  = require('express');
const { createRoute } = require('./routes/create');
const { readRoute } = require('./routes/read');
const { updateRoute } = require('./routes/update');
const { deleteRoute } = require('./routes/delete');
const cors = require('cors')
const app = express();
const path = require('path')
const port = 5400;

app.use(cors())

app.use(express.json());

app.use(express.static(path.join(__dirname,"..","frontend","dist")));

app.use('/api/create',createRoute)
app.use('/api/read',readRoute)
app.use('/api/update',updateRoute)
app.use('/api/delete',deleteRoute)

//all the default endpoints are set to the client side 
app.all('*',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,"..","frontend","dist","index.html"))
})

app.listen(port,
    ()=>console.log(`Server running at port ${port}`));