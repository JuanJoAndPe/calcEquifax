const axios = require('axios');
const { getToken } = require('../services/tokenService');
const { equifaxApiUrl } = require('../utils/config');

async function consultarPorCedula(req, res) {
  const { cedula } = req.body;

  if (!cedula) return res.status(400).json({ error: 'Cédula requerida' });

  try {
    const token = await getToken();

    const payload = {
      applicants: {
        primaryConsumer: {
          personalInformation: {
            tipoDocumento: "C",
            numeroDocumento: "0116389420"
          }
        }
      },
      productData: {
        billTo: "000042B001",
        shipTo: "000042B001S0001",
        productName: "ECREPORTE",
        productOrch: "Reporte360",
        configuration: "Reporte360",
        customer: "ECRE360MANTILLATERAN",
        model: "360MANTILLATERAN"
      }
    };

    const response = await axios.post(equifaxApiUrl, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error al consultar Equifax:', error?.response?.data || error.message);
    res.status(500).json({ error: 'No se pudo obtener información del deudor' });
  }
}

module.exports = { consultarPorCedula };
