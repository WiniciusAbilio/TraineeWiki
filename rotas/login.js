const express = require('express');
const router = express.Router();
const db = require('../src/conexaoMySQL.js'); // Importe a conexão com o MySQL
const md5 = require('md5')

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
router.use(bodyParser.urlencoded({ extended: true }));



// Rota para logar
router.post('/login', (req, res) => {
    const { email, senha} = req.body;

    db.query('SELECT * FROM Usuario WHERE email = ?', email, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      } 
      if (result.length === 0) {
        // Usuário não encontrado
        res.status(401).json({ message: 'Usuário não encontrado' });
      } else {
        const user = result[0];
        const senhaHash = md5(senha);
        if (user.senha == senhaHash) {
          // Senha correta, pode criar uma token de usuário
          const payload = {
            email: user.email,
            nome: user.nome,
            altura: user.altura,
            peso: user.peso,
            data_nascimento: user.data_nascimento,
            cidade: user.cidade,
            estado: user.estado,
            genero: user.genero,
            descricao: user.descricao,
            telefone: user.telefone
          };
      
          // Chave secreta para assinar o token (mantenha isso em segredo em um ambiente real)
          const chaveSecreta = 'chave_secreta';
      
          // Configurações do token (pode incluir expiração, algoritmo, etc.)
          const opcoes = {
            expiresIn: '1h', // Expira em 1 hora
          };
      
          // Assina o token com o payload, chave secreta e opções
          const token = jwt.sign(payload, chaveSecreta, opcoes);
      
          // Retorna um JSON com o token
          res.json({ token });
        } else {
          // Senha incorreta
          res.redirect('http://localhost:3000/');
        }
      }
  
    });

  });
 
  router.get('/profile', (req, res) => {
    if (req.session.user) {
      // O usuário está autenticado, acesse as informações do usuário na sessão
      const user = req.session.user;
      res.send(`Olá, ${user.username}`);
    } else {
      // Redirecione ou retorne uma mensagem de erro caso o usuário não esteja autenticado
      res.send('Acesso não autorizado');
    }
  });
    

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
        console.error('Erro ao fazer logout:', err);
        }
        res.redirect('http://localhost:3000/'); // Redirecione para a página de login ou para onde desejar
    });
});


module.exports = router;
