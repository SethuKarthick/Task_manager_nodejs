const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
    name:{
        type : String, 
        required : [true, "Please enter the Task Name"],
        maxLength : [20, "Only 20 chars are allowed"],
        trim : true 
    }, 
    completed:{
        type : Boolean,
        default: false
    }, 
    createAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Task', TaskSchema)