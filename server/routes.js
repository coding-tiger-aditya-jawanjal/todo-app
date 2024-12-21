const express = require("express");
const {
  addTask,
  getTasks,
  deleteTask,
  updateTask,
} = require("./controllers/task-controller");
const { uploadPic, getPic } = require("./controllers/pic-controller");
const { upload } = require("./middleware/upload");
const router = express.Router();

router.post("/task", addTask);
router.get("/task", getTasks);
router.delete("/task/:id", deleteTask);
router.put("/task/:id", updateTask);

router.post("/pic", upload.single("image"), uploadPic);
router.get("/pic", getPic);

module.exports = router;
