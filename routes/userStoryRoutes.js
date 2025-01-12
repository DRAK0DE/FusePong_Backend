const express = require('express');
const router = express.Router();
const UserStory = require('../models/UserStory');  // Importar el modelo de historia de usuario


router.post('/', async (req, res) => {
  try {
    const { projectId, title, description } = req.body;

    if (!projectId || !title || !description) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Crear la historia de usuario
    const newUserStory = new UserStory({
      projectId,
      title,
      description
    });

    await newUserStory.save();  // Subir a la BD
    res.status(201).json({ message: 'Historia de usuario creada con éxito', userStory: newUserStory });
  } catch (error) {
    console.error('Error al crear la historia de usuario:', error);
    res.status(500).json({ message: 'Error al crear la historia de usuario' });
  }
});

module.exports = router;
