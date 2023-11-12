const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const router = express.Router();
const db = require('../src/conexaoMySQL.js');
const md5 = require('md5');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// ...

router.post('/usuario', urlencodedParser, async (req, res) => {
  const { email, nome, senha, altura, peso, data_nascimento, cpf, cidade, estado, genero, descricao, telefone } = req.body;
  const values = [email, nome, md5(senha), altura, peso, data_nascimento, cidade, estado, genero, descricao, telefone];

  if (cpf !== undefined) {
    const url = 'http://localhost:3010/personal';
    const dados = {
      cpf: cpf,
      Usuario_email: email
    };


    request({
      url: url,
      method: "POST",
      json: true,   // <--Very important!!!
      body: dados
    }, function (error, response, body) {

    });


  }

  db.query('INSERT INTO Usuario (email, nome, senha, altura, peso, data_nascimento, cidade, estado, genero, descricao, telefone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', values, (err, result) => {
    if (err) {
      if(err.code == 'ER_DUP_ENTRY'){
        res.redirect('http://localhost:3000/');
      }
      res.status(500).json({ error: err.message });

      return;
    }
    
    res.redirect('http://localhost:3000/');
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
