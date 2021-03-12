const Project = require('../projects/projects-model')
const Action = require('../actions/actions-model')

async function validateActionId(req, res, next){
    const { id } = req.params
    try{
        const action = await Action.get(id)
        if (!action){
            res.status(404).json({
                message: `The action with id of ${id} could not be found.`,
            })
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'The action could not be retrieved',
            actualError: err
        })
    }
}

async function validateProjectId(req, res, next){
    const { id } = req.params
    try{
        const project = await Project.get(id)
        if(!project) {
            res.status(404).json({
                message: `The project with id of ${id} could not be found.` 
            })
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'The project could not be retrieved.',
            actualError: err
        })
    }
}

module.exports = {
    validateActionId,
    validateProjectId
}