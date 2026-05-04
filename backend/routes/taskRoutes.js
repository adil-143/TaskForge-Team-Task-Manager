const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/roleMiddleware");

const {
  createTask,
  getAllTasks,
  getMyTasks,
  updateTaskStatus
} = require("../controllers/taskController");

router.post("/create", authMiddleware, isAdmin, createTask);
router.get("/all", authMiddleware, getAllTasks);
router.get("/mytasks", authMiddleware, getMyTasks);
router.put("/status/:id", authMiddleware, updateTaskStatus);

module.exports = router;