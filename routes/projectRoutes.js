const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Crear un nuevo proyecto con múltiples descripciones
router.post('/', async (req, res) => {
  try {
    const { name, descriptions, companyId } = req.body;
    const newProject = await Project.create({ name, descriptions, companyId });
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    res.status(500).json({ message: 'Error al crear proyecto' });
  }
});

// Obtener todos los proyectos
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('companyId', 'name');
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    res.status(500).json({ message: 'Error al obtener proyectos' });
  }
});

// Editar proyecto (añadir descripción)
router.put('/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const { descriptions } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $push: { descriptions: { $each: descriptions } } },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Error al actualizar proyecto:', error);
    res.status(500).json({ message: 'Error al actualizar proyecto' });
  }
});

module.exports = router;
