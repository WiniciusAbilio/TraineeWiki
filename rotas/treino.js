const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const db = require('../src/conexaoMySQL.js'); // Importe a conexão com o MySQL


// Rota para listar todos os registros de Treino
router.get('/grupo_treino/:Usuario_email', (req, res) => {
  const Usuario_email = req.params.Usuario_email;

  db.query('SELECT * FROM grupo_treino WHERE Usuario_email = ?', [Usuario_email], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: results });
  });
});

// Criar um novo registro de grupo_treino
router.post('/grupo_treino/:Usuario_email', (req, res) => {
  const Usuario_email = req.params.Usuario_email;
  const nome_grupo_treino = req.body.nome_grupo_treino;

  if (!Usuario_email || !nome_grupo_treino) {
    res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    return;
  }

  const query = 'INSERT INTO grupo_treino (Usuario_email, nome_grupo_treino) VALUES (?, ?)';
  const values = [Usuario_email, nome_grupo_treino];


  db.query(query, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Novo registro de grupo_treino criado com sucesso!', insertId: result.insertId });
  });
});

// Rotas para exercicio

// Listar todos os registros de exercicio
router.get('/exercicio', (req, res) => {
  db.query('SELECT * FROM exercicio', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: results });
  });
});

// Criar um novo registro de exercicio
router.post('/exercicio', (req, res) => {
  const { nome_exercicio } = req.body;
  if (!nome_exercicio) {
    res.status(400).json({ error: 'O campo nome_exercicio é obrigatório.' });
    return;
  }

  db.query('INSERT INTO exercicio (nome_exercicio) VALUES (?)', [nome_exercicio], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Novo registro de exercicio criado com sucesso!', insertId: result.insertId });
  });
});

// Excluir um registro de exercicio por código
router.delete('/exercicio/:Código_Exercicio', (req, res) => {
  const Código_Exercicio = req.params.Código_Exercicio;

  db.query('DELETE FROM exercicio WHERE Código_Exercicio = ?', [Código_Exercicio], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Nenhum registro encontrado.' });
      return;
    }

    res.json({ message: 'Registro de exercicio excluído com sucesso!' });
  });
});


router.get('/grupo_treino_exercicio/:Usuario_email', (req, res) => {
  const Usuario_email = req.params.Usuario_email;
  db.query('SELECT * FROM grupo_treino_exercicio WHERE grupo_treino_Usuario_email = ?', [Usuario_email] , (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: results });
  });
});

// Rota para criar um novo registro em grupo_treino_exercicio
router.post('/grupo_treino_exercicio', (req, res) => {
  const email_usuario = req.body.email_usuario;
  const grupo_treino_nome_grupo_treino = req.body.grupo_treino_nome_grupo_treino;
  const exercicios = req.body.exercicios;

  // Verificar se os campos necessários estão presentes
  if (!email_usuario || !grupo_treino_nome_grupo_treino || !exercicios || exercicios.length === 0) {
    res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    return;
  }

  // Mapear exercícios para um array de valores
  const values = exercicios.map(exercicio => [
    exercicio.exercicio_CodigoExercicio,
    exercicio.repeticoes,
    exercicio.series,
    email_usuario,
    grupo_treino_nome_grupo_treino
  ]);

  // Inserir dados na tabela grupo_treino_exercicio
  db.query('INSERT INTO grupo_treino_exercicio (exercicio_CodigoExercicio, repeticoes, series, grupo_treino_Usuario_email, grupo_treino_nome_grupo_treino) VALUES ?', [values], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Novo registro de grupo_treino_exercicio criado com sucesso!', insertId: result.insertId });
  });
});


// Rota para excluir um registro em grupo_treino_exercicio
router.delete('/grupo_treino_exercicio/:grupo_treino_Usuario_email/:grupo_treino_nome_grupo_treino', (req, res) => {
  const grupo_treino_Usuario_email = req.params.grupo_treino_Usuario_email;
  const grupo_treino_nome_grupo_treino = req.params.grupo_treino_nome_grupo_treino;

  // Exclusão na tabela grupo_treino_exercicio
  db.query('DELETE FROM grupo_treino_exercicio WHERE grupo_treino_Usuario_email = ? AND grupo_treino_nome_grupo_treino = ?', [grupo_treino_Usuario_email, grupo_treino_nome_grupo_treino], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Nenhum registro encontrado.' });
      return;
    }

    // Exclusão na tabela grupo_treino
    db.query('DELETE FROM grupo_treino WHERE Usuario_email = ? AND nome_grupo_treino = ?', [grupo_treino_Usuario_email, grupo_treino_nome_grupo_treino], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Nenhum registro encontrado.' });
        return;
      }

      res.json({ message: 'Registros excluídos com sucesso!' });
    });
  });
});



module.exports = router;
