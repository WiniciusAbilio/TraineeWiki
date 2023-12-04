const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const db = require('../src/conexaoMySQL.js'); // Importe a conexão com o MySQL

const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Rota para listar todos os registros de Treino
router.get('/treino', (req, res) => {
  db.query('SELECT * FROM Treino', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: results });
  });
});

// Rota para criar um novo registro de Treino
router.post('/treino', (req, res) => {
  const { nome_exercicio, repeticoes, series, Usuario_email } = req.body;
  if (!nome_exercicio || !repeticoes || !series || !Usuario_email) {
    res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    return;
  }
  const values = [nome_exercicio, repeticoes, series, Usuario_email];

  db.query('INSERT INTO Treino (nome_exercicio, repeticoes, series, Usuario_email) VALUES (?, ?, ?, ?)', values, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Registro de Treino criado com sucesso!', insertId: result.insertId });
  });
});

// Rota para atualizar um registro de Treino


module.exports = router;
