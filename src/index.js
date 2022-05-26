const express = require('express');
const app = express();
const cors = require('cors');
const Users = require('./routes/user');
const Residentes = require('./routes/residente');
const Etapas = require('./routes/etapas');
const Ciudadelas = require('./routes/ciudadelas');
const Viviendas = require('./routes/viviendas');
const Guardias = require('./routes/guardias');
const Visitantes = require('./routes/visitante');
const Admins = require('./routes/admins');

require('./database');

app.use(cors());
app.use(express.json());
api = '/api';

//app.use('/api', require('./routes/index'));
app.use(api + '/users', Users);
app.use(api + '/residentes', Residentes);
app.use(api + '/etapas', Etapas);
app.use(api + '/ciudadelas', Ciudadelas);
app.use(api + '/viviendas', Viviendas);
app.use(api + '/guardias', Guardias);
app.use(api + '/visitantes', Visitantes);
app.use(api + '/admins', Admins);

app.listen(3000);
console.log('server on port', 3000)