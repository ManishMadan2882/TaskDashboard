const {tasks} = require('../database/schema')

const readAllTasks = async (req,res)=>{     
    try{
        const data =await tasks.find();
        res.json(data);
    }
    catch(err){
        res.json({
            msg:'Some error occured',
            error:err
        });
    }

}
module.exports = {
    readAllTasks
}