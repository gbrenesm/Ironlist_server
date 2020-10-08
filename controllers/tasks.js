const Task = require("../models/Tasks")
const User = require("../models/User")

//// C
exports.createTask = async (req, res) => {
  const { description } = req.body
  const task = await Task.create({
    description
  })
  res.status(201).json({ task })
}


//// R
exports.getTasks = async (req, res) => {
  const tasks = await Task.find()
  res.status(200).json({ tasks })
}

//// U
exports.checkTask = async (req, res) => {
  const task = await Task.findById(req.params.taskId)
  await User.findByIdAndUpdate(req.user.id, {$push: {doneTasks: task}})
}