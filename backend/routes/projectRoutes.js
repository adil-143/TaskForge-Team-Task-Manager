const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/roleMiddleware");
const { createProject, getProjects } = require("../controllers/projectController");

router.post("/create", authMiddleware, isAdmin, createProject);
router.get("/all", authMiddleware, getProjects);

module.exports = router;