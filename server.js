const express = require('express');
const cors = require('cors');
const { port } = require('./utils/config');
const apiRoutes = require('./routes/api');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

app.get('/', (_, res) => res.send('Backend Equifax operativo'));

app.listen(port, () => console.log(`Servidor activo en puerto ${port}`));
