const express = require('express');
const bodyParser = require('body-parser'); 
const router = express.Router();
const db = require('../src/conexaoMySQL.js'); // Importe a conexão com o MySQL


const urlencodedParser = bodyParser.urlencoded({ extended: false})


// Rota para listar todos os registros de Personal
router.get('/personal', (req, res) => {
  db.query('SELECT * FROM Personal', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: results });
  });
});

// Rota para criar um novo registro de Personal
router.post('/personal', urlencodedParser, (req, res) => {
  const { certficacao, Usuario_email } = req.body;
  if (!certficacao || !Usuario_email) {
    res.status(400).json({ error: 'Os campos "certficacao" e "Usuario_email" são obrigatórios.' });
    return;
  }
  const values = [certficacao, Usuario_email];
  
  db.query('INSERT INTO Personal (certficacao, Usuario_email) VALUES (?, ?)', values, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Registro de Personal criado com sucesso!', insertId: result.insertId });
  });
});

// Rota para atualizar um registro de Personal
router.put('/personal/:Usuario_email', urlencodedParser, (req, res) => {
  const { Usuario_email } = req.params;
  const { certficacao } = req.body;
  if (!certficacao) {
    res.status(400).json({ error: 'O campo "certficacao" é obrigatório.' });
    return;
  }
  const values = [certficacao, Usuario_email];
  
  db.query('UPDATE Personal SET certficacao = ? WHERE Usuario_email = ?', values, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Registro de Personal atualizado com sucesso!' });
  });
});

// Rota para excluir um registro de Personal
router.delete('/personal/:Usuario_email', (req, res) => {
  const { Usuario_email } = req.params;
  
  db.query('DELETE FROM Personal WHERE Usuario_email = ?', [Usuario_email], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Registro de Personal excluído com sucesso!' });
  });
});

module.exports = router;
