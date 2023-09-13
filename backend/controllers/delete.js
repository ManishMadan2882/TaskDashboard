const {tasks} = require('../database/schema')
const deleteTask = async (req,res)=>{ //create a new blog
    
    try{    
    const taskId = req.params.id;

    await tasks.deleteOne({
        _id : taskId
    });
    res.json({msg:'deleted'})
    }
    catch(err){
    res.json({
        msg : 'Some error occured',
        error:err
    })
    }
}
module.exports = {
    deleteTask
}