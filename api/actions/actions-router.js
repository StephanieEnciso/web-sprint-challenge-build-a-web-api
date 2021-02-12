const express = require('express');

const  {
    validateProjectId,
    validateAction,
    validateActionId
} = require('../middleware/middleware');
const Action = require('./actions-model');
const Project = require('../projects/projects-model');

const router = express.Router();

router.get('', (req, res) => {
    Action.get()
      .then(actions => {
          res.status(200).json(actions);
      })
      .catch(error => {
          console.log(error);
          res.status(500).json({
              message: 'The actions could not be retrieved.'
          });
      });
});

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action);
});

module.exports = router;
