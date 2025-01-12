
require('dotenv').config(); 


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fusepong';

//Conectar a DB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
  })
  .catch((error) => {
    console.error('Error conectando a MongoDB:', error);
  });


const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const projectRoutes = require('./routes/projectRoutes');
const userStoryRoutes = require('./routes/userStoryRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

// Usar rutas con prefijo
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/user-stories', userStoryRoutes);
app.use('/api/tickets', ticketRoutes);

// Ruta de prueba
app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/', (req, res) => {
  res.send({ status: 'Servidor funcionando correctamente', version: '1.0.0' });
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
