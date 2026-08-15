const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to load projects" });
  }
});

module.exports = router;
