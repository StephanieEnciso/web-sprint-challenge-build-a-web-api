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

router.post('/:id', validateProjectId, validateAction, (req, res) => {
    const actionInfo = {...req.body, project_id: req.params.id}
    Action.insert(actionInfo)
      .then(action => {
          res.status(201).json(actionInfo)
      })
      .catch(error => {
          console.log(error);
          res.status(500).json({
              message: 'The action could not be added.'
          });
      });
});

router.put('/:id', validateActionId, validateAction, (req, res) => {
    Action.update(req.params.id, req.body)
      .then(action => {
          res.status(200).json(action);
      })
      .catch(error => {
          res.status(500).json({
              message: 'The action could not be updated.'
          });
      });
});

router.delete('/:id', validateActionId, (req, res) => {
    Action.remove(req.params.id)
      .then(action => {
          res.status(200).json(action);
      })
      .catch(error => {
          console.log(error);
          res.status(500).json({
              message: 'Action could not be removed.'
          })
      })
})

module.exports = router;
