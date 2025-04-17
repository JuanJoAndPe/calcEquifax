const express = require('express');
const router = express.Router();
const { consultarPorCedula } = require('../controllers/equifaxController');

router.post('/consulta-cedula', consultarPorCedula);

module.exports = router;
