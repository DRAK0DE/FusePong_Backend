const express = require('express'); 
const router = express.Router();
const Ticket = require('../models/Ticket');
const Project = require('../models/Project');

router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate({
        path: 'projectId',
        populate: {
          path: 'companyId',
          select: 'name',
        },
      });
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error al obtener tickets:', error);
    res.status(500).json({ message: 'Error al obtener tickets' });
  }
});

// Crear ticket
router.post('/', async (req, res) => {
  try {
    const { title, projectId, description, status = 'Activo' } = req.body;


    if (!title || !projectId || !description) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const newTicket = new Ticket({
      title,
      projectId,
      description,
      status,
    });

    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    console.error('Error al crear ticket:', error);
    res.status(500).json({ message: 'Error al crear ticket' });
  }
});

// Editar solo el estado del ticket
router.put('/:ticketId/status', async (req, res) => {
  const { ticketId } = req.params;
  const { status } = req.body;
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      { status },
      { new: true }
    ).populate({
      path: 'projectId',
      populate: {
        path: 'companyId',
        select: 'name',
      },
    });
    res.status(200).json(updatedTicket);
  } catch (error) {
    console.error('Error al actualizar ticket:', error);
    res.status(500).json({ message: 'Error al actualizar el estado del ticket' });
  }
});

// Editar ticket completo
router.put('/:ticketId', async (req, res) => {
  try {
    const { ticketId } = req.params;
    const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, req.body, {
      new: true,
    }).populate({
      path: 'projectId',
      populate: {
        path: 'companyId',
        select: 'name',
      },
    });
    res.status(200).json(updatedTicket);
  } catch (error) {
    console.error('Error al actualizar ticket:', error);
    res.status(500).json({ message: 'Error al actualizar ticket' });
  }
});

// Editar descripción del proyecto asociado al ticket
router.put('/edit-description', async (req, res) => {
  const { projectId, oldDescription, newDescription } = req.body;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }
    const descriptionIndex = project.descriptions.indexOf(oldDescription);
    if (descriptionIndex === -1) {
      return res.status(404).json({ message: 'Descripción no encontrada' });
    }

    project.descriptions[descriptionIndex] = newDescription;
    await project.save();

    res.status(200).json({ message: 'Descripción actualizada con éxito' });
  } catch (error) {
    console.error('Error al editar descripción:', error);
    res.status(500).json({ message: 'Error al editar descripción' });
  }
});

module.exports = router;
