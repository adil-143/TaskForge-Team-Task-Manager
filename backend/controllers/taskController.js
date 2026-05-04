const Task = require("../models/Task");

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, dueDate, priority } = req.body;

    if (!title || !description || !projectId || !assignedTo || !dueDate) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const task = await Task.create({
      title,
      description,
      projectId,
      assignedTo,
      dueDate,
      priority
    });

    res.status(201).json({
      msg: "Task Created Successfully",
      task
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get All Tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("projectId", "projectName")
      .populate("assignedTo", "name email role");

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get Logged User Tasks
const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id })
      .populate("projectId", "projectName");

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update Task Status
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      msg: "Task Status Updated",
      task
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getMyTasks,
  updateTaskStatus
};