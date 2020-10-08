const express = require('express');
const router = express.Router();

const {
    createTask,
    getTasks,
    checkTask} = require("../controllers/tasks")

router.post("/newtask", createTask)

router.get("/tasks", getTasks)

router.put("/checktask/:taskId", checkTask)

module.exports = router;