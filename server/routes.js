const express = require("express");
const {
  addTask,
  getTasks,
  deleteTask,
  updateTask,
} = require("./controllers/task-controller");
const router = express.Router();

router.post("/task", addTask);
router.get("/task", getTasks);
router.delete("/task/:id", deleteTask);
router.put("/task/:id", updateTask);

module.exports = router;
