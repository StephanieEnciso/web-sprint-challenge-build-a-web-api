const express = require('express')

const Project = require('./projects-model')
const { validateProjectId } = require('../middleware/middleware')

const router = express.Router()

router.get('', (req, res) => {
    Project.get()
      .then(projects => {
          res.status(200).json(projects)
      })
      .catch(err => {
          res.status(500).json({
              message: 'The projects could not be retrieved.',
              actualError: err
          })
      })
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

module.exports = router;