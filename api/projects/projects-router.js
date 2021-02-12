const express = require("express");

const {
  validateProjectId,
  validateProject,
} = require("../middleware/middleware");
const Project = require("./projects-model");

const router = express.Router();

router.get("", (req, res) => {
  Project.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The projects could not be retrieved.",
      });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.post("", validateProject, (req, res) => {
  Project.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The project could not be added.",
      });
    });
});

router.put("/:id", validateProjectId, validateProject, (req, res) => {
  Project.update(req.params.id, req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The project could not be updated.",
      });
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  Project.remove(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The project could not be removed.",
      });
    });
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  Project.getProjectActions(req.params.id)
    .then((projectActions) => {
      res.status(200).json(projectActions);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Could not retrieve project actions",
      });
    });
});

module.exports = router;
