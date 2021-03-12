const express = require('express')

const Project = require('./projects-model')
const { validateProjectId, validateProjectBody } = require('../middleware/middleware')

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

router.post('', validateProjectBody, (req, res) => {
    Project.insert(req.body)
      .then(project => {
          res.status(201).json(project)
      })
      .catch(err => {
          res.status(500).json({
              message: 'The project couls not be added.',
              actualError: err
          })
      })
})

router.put('/:id', validateProjectId, validateProjectBody, (req, res) => {
    Project.update(req.params.id, req.body)
      .then(project => {
          res.status(200).json(project)
      })
      .catch(err => {
          res.status(500).json({
              message: 'The project could not be updated',
              actualError: err
          })
      })
})

router.delete('/:id', validateProjectId, (req, res) => {
    Project.remove(req.params.id)
      .then(project => {
          res.status(200).json(project)
      })
      .catch(err => {
          res.status(500).json({
              message: 'The project could not be deleted.',
              actualError: err
          })
      })
})

router.get('/:id/actions', validateProjectId, (req, res) => {
    Project.getProjectActions(req.params.id)
      .then(projectActions => {
          res.status(200).json(projectActions)
      })
      .catch(err => {
          res.status(500).json({
              message: "The project's actions could not be retrieved.",
              actualError: err
          })
      })
})

module.exports = router;