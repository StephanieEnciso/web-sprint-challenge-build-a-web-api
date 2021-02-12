const express = require('express');

const  {
    validateProjectId,
    validateProject,
} = require('../middleware/middleware');
const Project = require('./projects-model');

const router = express.Router();

module.exports = router;
