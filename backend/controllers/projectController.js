const Project = require("../models/Project");

// Create Project
const createProject = async (req, res) => {
  try {
    const { projectName, description, teamMembers } = req.body;

    if (!projectName || !description) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const project = await Project.create({
      projectName,
      description,
      teamMembers,
      createdBy: req.user.id
    });

    res.status(201).json({
      msg: "Project Created Successfully",
      project
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get All Projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("createdBy", "name email")
      .populate("teamMembers", "name email role");

    res.status(200).json(projects);

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { createProject, getProjects };