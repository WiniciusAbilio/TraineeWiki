const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({ path: '../variaveis.env' });


const app = express();


const port = process.env.PORT;

const usuarioRoutes = require('../rotas/usuario');
const personalRoutes = require('../rotas/personal');
const treinoRoutes = require('../rotas/treino');


// Middleware para registrar a hora de chegada da solicitação
app.use((req, res, next) => {
  const horaAtual = new Date().toLocaleTimeString();
  console.log(`Solicitação recebida em: ${horaAtual}`);
  next(); // Chame next() para continuar com o processamento da solicitação
});

//Rotas de inserçao no banco
app.use('/', usuarioRoutes);
app.use('/', personalRoutes);
app.use('/', treinoRoutes);

// Configurar o diretório 'front' como o local dos arquivos HTML

const frontPasta = {root: '../front'}
//Rota para pagina inicial

/*
app.get('/', (_, res) => {
  res.sendFile('index.html', frontPasta);
});
*/


// Rota para a página de cadastro do Usuario
app.get('/cadastroUsuario', (_, res) => {
    res.sendFile('cadastro.html', frontPasta);
});

app.listen(port, () => {
  console.log(`Aplicativo Express.js rodando na porta ${port}`);
});
