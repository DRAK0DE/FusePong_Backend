const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  comments: { type: String },
  status: { type: String, default: 'Activo' },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  description: { type: String, required: true }, // Nueva propiedad para la descripción seleccionada
});

module.exports = mongoose.model('Ticket', ticketSchema);