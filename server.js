const express = require('express');
const cors = require('cors');
const { port } = require('./utils/config');
const apiRoutes = require('./routes/api');

const app = express();

app.use(cors({
  origin: '*', // o especifica tu dominio frontend si lo subes a un servidor
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/', (_, res) => res.send('Backend Equifax operativo'));

app.listen(port, () => console.log(`Servidor activo en puerto ${port}`));
