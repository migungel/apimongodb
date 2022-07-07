const express = require('express');
const app = express();
const cors = require('cors');
//import path from 'path';
const path = require('path');
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
//app.use('/uploads', express.static(path.resolve('uploads')));
//app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(__dirname + '/uploads'));
//app.use(express.static(__dirname + '/data/img'));
api = '/api';

//app.get('/', (req, res)=>res.send('Hello world'))

app.use(api + '/users', Users);
app.use(api + '/residentes', Residentes);
app.use(api + '/etapas', Etapas);
app.use(api + '/ciudadelas', Ciudadelas);
app.use(api + '/viviendas', Viviendas);
app.use(api + '/guardias', Guardias);
app.use(api + '/visitantes', Visitantes);
app.use(api + '/admins', Admins);

app.listen(3000);
console.log('Server running', 3000);
