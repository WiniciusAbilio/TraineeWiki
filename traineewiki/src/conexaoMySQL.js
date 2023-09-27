const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: process.env.NAMEDB
});

  
db.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao MySQL:', err);
      return;
    }
    console.log('Conectado ao MySQL!');
});

/*
db.end((err) => {
    if (err) {
      console.error('Erro ao encerrar a conexão:', err);
      return;
    }
    console.log('Conexão encerrada.');
});
 */ 

module.exports = db;
