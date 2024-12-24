const express = require("express");
const {
  addTask,
  getTasks,
  deleteTask,
  updateTask,
} = require("./controllers/task-controller");
const { uploadPic, getPic } = require("./controllers/pic-controller");
const { upload } = require("./middleware/upload");
const { signup, login, logout } = require("./controllers/user-controller");
const { auth } = require("./middleware/auth");
const router = express.Router();

router.post("/task", auth, addTask);
router.get("/task", auth, getTasks);
router.delete("/task/:id", auth, deleteTask);
router.put("/task/:id", updateTask);

router.post("/pic", upload.single("image"), uploadPic);
router.get("/pic", getPic);

router.post("/user/signup", signup);
router.post("/user/login", login);
router.post("/user/logout", auth, logout);

module.exports = router;
