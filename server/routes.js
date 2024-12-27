const express = require("express");
const {
  addTask,
  getTasks,
  deleteTask,
  updateTask,
} = require("./controllers/task-controller");
const {
  uploadPic,
  getPic,
  deletePic,
  updatePic,
} = require("./controllers/pic-controller");
const { upload } = require("./middleware/upload");
const {
  signup,
  login,
  logout,
  checkAuth,
} = require("./controllers/user-controller");
const { auth } = require("./middleware/auth");
const router = express.Router();

// task routes
router.post("/task", auth, addTask);
router.get("/task", auth, getTasks);
router.delete("/task/:id", auth, deleteTask);
router.put("/task/:id", auth, updateTask);

// pic routes
router.post("/pic", auth, upload.single("image"), uploadPic);
router.get("/pic", auth, getPic);
router.delete("/pic", auth, deletePic);
router.put("/pic", auth, upload.single("image"), updatePic);

// user routes
router.post("/user/signup", signup);
router.post("/user/login", login);
router.post("/user/logout", auth, logout);
router.get("/user/auth", auth, checkAuth);

module.exports = router;
