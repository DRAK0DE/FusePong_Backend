// 1) Cargar variables de entorno
require('dotenv').config(); 

// 2) Importar dependencias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 3) Inicializar la app de Express
const app = express();

// 4) Middlewares globales
app.use(cors());
app.use(express.json());

// 5) Variables desde .env
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fusepong';

// 6) Conectar a MongoDB (Atlas) con Mongoose
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
  })
  .catch((error) => {
    console.error('Error conectando a MongoDB:', error);
  });

// 7) Importar rutas
const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const projectRoutes = require('./routes/projectRoutes');
const userStoryRoutes = require('./routes/userStoryRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

// 8) Usar rutas con prefijo '/api/...'
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/user-stories', userStoryRoutes);
app.use('/api/tickets', ticketRoutes);

// Ruta de prueba
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Ruta base para mostrar estado
app.get('/', (req, res) => {
  res.send({ status: 'Servidor funcionando correctamente', version: '1.0.0' });
});

// 9) Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
