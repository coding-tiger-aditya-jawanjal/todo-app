const Task = require("../models/task-model");
const User = require("../models/user-model");

exports.addTask = async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ msg: "No task is provided !" });
    }

    const newTask = new Task({
      task,
      isCompleted: false,
    });

    const savedTask = await newTask.save();

    if (!savedTask) {
      return res.status(400).json({ msg: "Error in saving task !" });
    }

    const updateTaskInUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { tasks: savedTask._id },
      },
      { new: true }
    );

    res
      .status(201)
      .json({ msg: "Task Created !", savedTask, updateTaskInUser });
  } catch (error) {
    res.status(500).json({ msg: "Error in addTask !", err: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ isCompleted: 1 });
    res.status(200).json({ msg: "All Tasks fetched !", tasks });
  } catch (error) {
    res.status(500).json({ msg: "Error in getTasks !", err: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, complete } = req.body;

    if (!id) {
      return res.status(400).json({ msg: "id is required !" });
    }

    const updates = {};

    if (task) updates.task = task;
    if (typeof complete === "boolean") updates.isCompleted = complete;

    const taskexists = await Task.findById(id);

    if (!taskexists) {
      return res.status(400).json({ msg: "task does not exist !" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    res.status(201).json({ msg: "task Updated !", updatedTask });
  } catch (error) {
    res.status(500).json({ msg: "Error in updateTask !", err: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ msg: "id is required !" });
    }

    const taskExist = await Task.findById(id);

    if (!taskExist) {
      return res.status(400).json({ msg: "No such task !" });
    }

    await Task.findByIdAndDelete(id);
    res.status(201).json({ msg: "task deleted !" });
  } catch (error) {
    res.status(500).json({ msg: "Error in deleteTask !", err: error.message });
  }
};
