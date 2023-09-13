const {tasks} = require('../database/schema')
const updateTask = async (req,res)=>{ //create a new blog
    
    try{
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
    
    const taskId = req.params.id;

    await tasks.updateOne({
        _id : taskId
    },
    {
    $set:{
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
    }}
    )
    res.json({msg:'updated'})
}
catch(err){
    res.json({
        msg : 'Some error occured',
        error:err
    })
}
}
module.exports = {
    updateTask
}