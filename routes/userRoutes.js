const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Company = require('../models/Company');

// Registrar usuario
router.post('/register', async (req, res) => {
  try {
    const { email, password, companyId } = req.body;
    
    // Validar si ya existe el usuario
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await User.create({
      email,
      password: hashedPassword,
      company: companyId
    });

    res.status(201).json({ message: 'Usuario registrado', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

// Ingreso usuario
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email }).populate('company');
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Crear token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        _id: user._id,
        email: user.email,
        company: user.company
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('company');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
});

module.exports = router;
