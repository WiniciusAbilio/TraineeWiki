const express = require('express');
const bodyParser = require('body-parser'); 
const router = express.Router();
const db = require('../src/conexaoMySQL.js'); // Importe a conexão com o MySQL
const md5 = require('md5')

const urlencodedParser = bodyParser.urlencoded({ extended: false})

// Rota para listar todos os usuários
router.get('/usuario', (req, res) => {
  db.query('SELECT * FROM Usuario', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: results });
  });
});

// Rota para criar um novo usuário
router.post('/usuario', urlencodedParser, (req, res) => {
  const { email, nome, senha, altura, peso, data_nascimento, cidade, estado, genero, descricao, telefone } = req.body;
  const values = [email, nome, md5(senha), altura, peso, data_nascimento, cidade, estado, genero, descricao, telefone];
  
  db.query('INSERT INTO Usuario (email, nome, senha, altura, peso, data_nascimento, cidade, estado, genero, descricao, telefone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', values, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Usuário criado com sucesso!', insertId: result.insertId });
  });
});

// Rota para atualizar um usuário
router.put('/usuario/:email', urlencodedParser, (req, res) => {
  const { email } = req.params;
  const { nome, senha, altura, peso, data_nascimento, cidade, estado, genero, descricao, telefone } = req.body;
  const values = [nome, md5(senha), altura, peso, data_nascimento, cidade, estado, genero, descricao, telefone, email];
  
  db.query('UPDATE Usuario SET nome = ?, senha = ?, altura = ?, peso = ?, data_nascimento = ?, cidade = ?, estado = ?, genero = ?, descricao = ?, telefone = ? WHERE email = ?', values, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Usuário atualizado com sucesso!' });
  });
});

// Rota para excluir um usuário
router.delete('/usuario/:email', (req, res) => {
  const { email } = req.params;
  
  db.query('DELETE FROM Usuario WHERE email = ?', [email], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Usuário excluído com sucesso!' });
  });
});


module.exports = router;
