const express = require('express');
const router = express.Router();

const {
    createTask,
    getTasks,
    checkTask,
    deleteTask,
    getUserTasks} = require("../controllers/tasks")

router.post("/newtask", createTask)

router.get("/tasks", getTasks)
router.get("/usertasks", getUserTasks)

router.put("/:taskId", checkTask)

router.delete("/:taskId", deleteTask)

module.exports = router;