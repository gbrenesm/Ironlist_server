const Task = require("../models/Tasks")
const User = require("../models/User")

//// C
exports.createTask = async (req, res) => {
  const { description } = req.body
  const task = await Task.create({
    description
  })
  await User.findByIdAndUpdate(req.user.id, {$push: { createdTasks: task }})
  res.status(201).json({ task })
}

//// R
exports.getTasks = async (req, res) => {
  const tasks = await Task.find().populate("completedBy")
  res.status(200).json({ tasks })
}

exports.getUserTasks = async (req, res) => {
  const tasks = await User.findById(req.user.id).populate("createdTasks")
  res.status(200).json({ tasks })
}

//// U
exports.checkTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.taskId, {completed: true, $push: {completedBy: req.user.id}})
  res.status(200).json({ message: "Task checked"})
}

//// D
exports.deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.taskId)
  res.status(200).json({message: "Task deleted"})
}