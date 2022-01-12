const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async-wrapper');
const {createCustomError} = require('../errors/custom-error');


const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ success: true, data:{tasks, noOfTasks:tasks.length}})
})

const createTask = asyncWrapper( async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({task})
})

const getTask =asyncWrapper( async (req, res, next) => {
    const taskId = req.params.id;
    const task = await Task.findOne({_id: taskId})
    //console.log(task)
    if (!task){
        return next(createCustomError(`no task found with the Id: ${taskId}`, 404))
        // const error =  new Error("not Found");
        // error.status = 404;
        // return next(error)
        // return res.status(404).json({msg: })        
    }
    res.status(200).json({task})
    
})

const deleteTask = asyncWrapper( async (req, res, next) => {
    const taskId = req.params.id;
    const task = await Task.findOneAndDelete({_id:taskId})
    if(!task){
        return next(createCustomError(`no task found with the Id: ${taskId}`, 404))
        // return res.status(404).json({msg : `no task fount with the Id: ${taskId}`})
    }
    res.status(200).json({task})
})

const updateTask = asyncWrapper(async (req, res, next) => {
    const taskId = req.params.id;
    const task = await Task.findOneAndUpdate({_id:taskId}, req.body, {
        new: true,
        runValidators:true
    })
    if (!task){
        return next(createCustomError(`no task found with the Id: ${taskId}`, 404))
        // return res.status(404).json({msg:`No task found with the ID ${taskId}`});
    }
    res.status(200).json({task})
})

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}