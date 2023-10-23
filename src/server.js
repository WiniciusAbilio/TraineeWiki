const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session'); // Importe o módulo express-session

require('dotenv').config({ path: '../variaveis.env' });


const app = express();


const port = process.env.PORT;

const usuarioRoutes = require('../rotas/usuario');
const personalRoutes = require('../rotas/personal');
const treinoRoutes = require('../rotas/treino');
const login = require('../rotas/login');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware para registrar a hora de chegada da solicitação
app.use((req, res, next) => {
  const horaAtual = new Date().toLocaleTimeString();
  console.log(`Solicitação recebida em: ${horaAtual}`);
  next(); // Chame next() para continuar com o processamento da solicitação
});



app.use(session({
  secret: 'blegs', // Use um segredo seguro em produção
  resave: false,
  saveUninitialized: false
}));

//Rotas de inserçao no banco
app.use('/', usuarioRoutes);
app.use('/', personalRoutes);
app.use('/', treinoRoutes);
app.use('/', login);

app.listen(port, () => {
  console.log(`Aplicativo Express.js rodando na porta ${port}`);
});
