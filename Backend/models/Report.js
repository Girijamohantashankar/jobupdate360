const mongoose = require('mongoose');

const jobReport = new mongoose.Schema({
    job_id:{
        type: String,
        required:true
    },
    problem:{
        type:String,
        required:true
    },
    discription:{
        type:String,
       
    }
})

const reportSchema = mongoose.model('reportJob',jobReport)

module.exports=reportSchema