const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const router = express.Router();
const db = require('../src/conexaoMySQL.js');
const md5 = require('md5');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/usuario', (req, res) => {
  db.query('SELECT * FROM usuario', (err, result) => {
    if (err) {
      // Se ocorrer um erro durante a consulta
      console.error('Erro ao buscar usuários:', err);
      res.status(500).json({ error: 'Erro ao buscar usuários.' });
      return;
    }

    // Se a consulta for bem-sucedida, retorna os usuários
    res.json({ usuarios: result });
  });
});

router.post('/usuario', urlencodedParser, async (req, res) => {
  const { email, nome, senha, altura, peso, data_nascimento, cpf, cidade, estado, genero, descricao, telefone } = req.body;
  const values = [email, nome, md5(String(senha)), altura, peso, data_nascimento, cidade, estado, genero, descricao, telefone];

  if (cpf !== undefined) {
    const url = 'http://localhost:3010/personal';
    const dados = {
      cpf: cpf,
      Usuario_email: email
    };


    request({
      url: url,
      method: "POST",
      json: true,   
      body: dados
    }, function (error, response, body) {

    });


  }

  db.query('INSERT INTO usuario (email, nome, senha, altura, peso, data_nascimento, cidade, estado, genero, descricao, telefone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', values, (err, result) => {
    if (err) {
      if (err.code == 'ER_DUP_ENTRY') {
        res.redirect('http://localhost:3000/');
      }
      res.status(500).json({ error: err.message });

      return;
    }

    res.redirect('http://localhost:3000/');
  });

});
// Rota para atualizar um usuário
router.put('/usuario/:email', (req, res) => {
  const email = req.params.email;
  let query = 'UPDATE usuario SET nome = ?, senha = ?, altura = ?, peso = ?, genero = ?, telefone = ?, data_nascimento = ?, estado = ?, cidade = ?, descricao = ? WHERE email = ?';

  const { nome, senha, altura, peso, genero, telefone, data_nascimento, estado, cidade, descricao } = req.body;

  let values;
  if (senha == undefined) {
    query = 'UPDATE usuario SET nome = ?, altura = ?, peso = ?, genero = ?, telefone = ?, data_nascimento = ?, estado = ?, cidade = ?, descricao = ? WHERE email = ?';
    values = [nome, altura, peso, genero, telefone, data_nascimento, estado, cidade, descricao, email];
  } else {
    const hashedSenha = String(md5(senha)); // Use a função md5 para a senha
    values = [nome, hashedSenha, altura, peso, genero, telefone, data_nascimento, estado, cidade, descricao, email];
  }


  db.query(query, values, (err, result) => {
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

  db.query('DELETE FROM usuario WHERE email = ?', [email], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Usuário excluído com sucesso!' });
  });
});


router.post('/match/:usuario_email/:usuario_email2', async (req, res) => {
  const { usuario_email, usuario_email2} = req.params;
  const aceito = req.body;
  
  const values = [usuario_email, usuario_email2, aceito];

  db.query('INSERT INTO matchUsuario(usuario_email, usuario_email2, aceito) VALUES (?, ?, ?)', values, (err, result) => {
    if (err) {
      if (err.code == 'ER_DUP_ENTRY') {
        res.redirect('http://localhost:3000/');
      }
      res.status(500).json({ error: err.message });
      return;
    }

    res.redirect('http://localhost:3000/');
  });



});

module.exports = router;
