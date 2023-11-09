const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({ path: '../variaveis.env' });
const cors = require('cors')




const app = express();


const port = process.env.PORT;

const usuarioRoutes = require('../rotas/usuario');
const personalRoutes = require('../rotas/personal');
const treinoRoutes = require('../rotas/treino');
const login = require('../rotas/login');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions));

//Rotas de inserçao no banco

app.use('/', usuarioRoutes);
app.use('/', personalRoutes);
app.use('/', treinoRoutes);
app.use('/', login);

app.listen(port, () => {
  console.log(`Aplicativo Express.js rodando na porta ${port}`);
});
