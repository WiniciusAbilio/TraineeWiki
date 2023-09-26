const express = require('express');
const bodyParser = require('body-parser'); 
const router = express.Router();
const db = require('../src/conexaoMySQL.js'); // Importe a conexão com o MySQL

const urlencodedParser = bodyParser.urlencoded({ extended: false})

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
router.post('/treino', urlencodedParser,(req, res) => {
  const { nome_treino, nome_exercicio, repeticoes, series, Usuario_email } = req.body;
  if (!nome_treino || !nome_exercicio || !repeticoes || !series || !Usuario_email) {
    res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    return;
  }
  const values = [nome_treino, nome_exercicio, repeticoes, series, Usuario_email];
  
  db.query('INSERT INTO Treino (nome_treino, nome_exercicio, repeticoes, series, Usuario_email) VALUES (?, ?, ?, ?, ?)', values, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Registro de Treino criado com sucesso!', insertId: result.insertId });
  });
});

// Rota para atualizar um registro de Treino
router.put('/treino/:Usuario_email', urlencodedParser, (req, res) => {
  const { Usuario_email } = req.params;
  const { nome_treino, nome_exercicio, repeticoes, series } = req.body;
  if (!nome_treino || !nome_exercicio || !repeticoes || !series) {
    res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    return;
  }
  const values = [nome_treino, nome_exercicio, repeticoes, series, Usuario_email];
  
  db.query('UPDATE Treino SET nome_treino = ?, nome_exercicio = ?, repeticoes = ?, series = ? WHERE Usuario_email = ?', values, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Registro de Treino atualizado com sucesso!' });
  });
});

// Rota para excluir um registro de Treino
router.delete('/treino/:Usuario_email', (req, res) => {
  const { Usuario_email } = req.params;
  
  db.query('DELETE FROM Treino WHERE Usuario_email = ?', [Usuario_email], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Registro de Treino excluído com sucesso!' });
  });
});

module.exports = router;
