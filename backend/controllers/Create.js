const {tasks} = require('../database/schema')
const createTask = async (req,res)=>{ //create a new blog
const {ensrCode,
caseId,
caseDate,
zone,
receivedFrom,
processName,
caseName,
status,
timeElapsed,
dateExtension,
assignedTo,
action} = req.body;
   
    const newbie = new tasks({
        ensrCode,
        caseId,
        caseDate,
        zone,
        receivedFrom,
        processName,
        caseName,
        status,
        timeElapsed,
        dateExtension,
        assignedTo,
        action
    });
   const newone = await newbie.save();
    res.json({msg:'saved',id:newone._id})

}
module.exports = {
    createTask
}