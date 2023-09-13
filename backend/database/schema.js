require("./connect");

const mongoose = require('mongoose');


const tasksSchema = new mongoose.Schema({
ensrCode:String,
caseId:String,
caseDate:String,
zone:String,
receivedFrom:String,
processName:String,
caseName:String,
status:String,
timeElapsed:String,
dateExtension:String,
assignedTo:String,
action:String
})
const tasks = mongoose.model('Tasks', tasksSchema);
module.exports = {tasks};

