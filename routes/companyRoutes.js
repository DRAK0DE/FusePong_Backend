const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// Crear compañía
router.post('/', async (req, res) => {
  try {
    const companyData = req.body; // {name, nit, phone, address, email}
    const newCompany = await Company.create(companyData);
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear compañía' });
  }
});

// Listar compañías
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener compañías' });
  }
});

module.exports = router;
