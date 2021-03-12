const express = require('express')

const Action = require('./actions-model')
const { validateActionId, validateActionBody } = require('../middleware/middleware')

const router = express.Router()

router.get('', (req, res) => {
    Action.get()
      .then(actions => {
          res.status(200).json(actions)
      })
      .catch(err => {
          res.status(500).json({
              message: 'The actions could not be retrieved',
              actualError: err 
          })
      })
})

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action)
})

router.post('', validateActionBody, (req, res) => {
    Action.insert(req.body)
      .then(action => {
          res.status(201).json(action)
      })
      .catch(err => {
          res.status(500).json({
              message: 'The action could not be added.',
              actualError: err
          })
      })
})

module.exports = router