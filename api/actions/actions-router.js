const express = require('express')

const Action = require('./actions-model')
const { validateActionId } = require('../middleware/middleware')

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

module.exports = router