const express = require('express');
const router = express.Router();
const db = require('../src/conexaoMySQL.js'); // Importe a conexão com o MySQL
const md5 = require('md5')

const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));



// Rota para logar
router.post('/login', (req, res) => {
    const { email, senha } = req.body;

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
        if (user.senha === md5(senha)) {
          // Senha correta, pode criar uma sessão de usuário
          req.session.user = user; // Isso pressupõe que você tenha configurado a sessão anteriormente
          console.log(req.session.user)
          res.status(200).json({ message: 'Login bem-sucedido' });
        } else {
          // Senha incorreta
          res.status(401).json({ message: 'Senha incorreta' });
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
