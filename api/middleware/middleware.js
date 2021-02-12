const Project = require('../projects/projects-model');
const Action = require('../actions/actions-model');

async function validateProjectId(req, res, next) {
    try {
        const project = await Project.get(req.params.id)
        if(project) {
            req.project = project
            next()
        } else {
            res.status(404).json({
                message: 'Project not found.'
            });
        };
    } catch (error) {
        res.status(500).json({
            message: 'The project information could not be retrieved.'
        });
    };
};

function validateProject(req, res, next) {
    const { name, description } = req.body;
    if(name === '' || description === '') {
        res.status(400).json({
            message: 'Name and description are required.'
        })
    } else {
        next();
    };
};

async function validateActionId(req, res, next) {
    try {
        const action = await Action.get(req.params.id)
        if(action) {
            req.action = action
            next()
        } else {
            res.status(404).json({
                message: 'Action not found.'
            });
        };
    } catch (error) {
        res.status(500).json({
            message: 'The action information could not be retrieved.'
        });
    };
};

function validateAction(req, res, next) {
    const { description, notes } = req.body;
    if (description === '' || notes === '') {
        res.staus(400).json({
            message: 'Description and notes are required.'
        });
    } else {
        next();
    };
};

module.exports = {
    validateProject,
    validateProjectId,
    validateAction,
    validateActionId
};