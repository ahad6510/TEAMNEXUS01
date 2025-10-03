const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().limit(50);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/projects
router.post('/', async (req, res) => {
  try {
    const proj = new Project(req.body);
    await proj.save();
    res.json(proj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
