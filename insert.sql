ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

use mydb;



-- Inserir exercícios de musculação na tabela 'exercicio'
INSERT INTO `mydb`.`exercicio` (nome_exercicio) VALUES ('Supino');
INSERT INTO `mydb`.`exercicio` (nome_exercicio) VALUES ('Agachamento');
INSERT INTO `mydb`.`exercicio` (nome_exercicio) VALUES ('Desenvolvimento de Ombro');
INSERT INTO `mydb`.`exercicio` (nome_exercicio) VALUES ('Levantamento Terra');
INSERT INTO `mydb`.`exercicio` (nome_exercicio) VALUES ('Rosca Direta');
INSERT INTO `mydb`.`exercicio` (nome_exercicio) VALUES ('Tríceps Pulley');
INSERT INTO `mydb`.`exercicio` (nome_exercicio) VALUES ('Leg Press');
INSERT INTO `mydb`.`exercicio` (nome_exercicio) VALUES ('Remada');
INSERT INTO `mydb`.`exercicio` (nome_exercicio) VALUES ('Flexão');
INSERT INTO `mydb`.`exercicio` (nome_exercicio) VALUES ('Cadeira Extensora');
INSERT INTO `mydb`.`exercicio` (nome_exercicio) VALUES ('Puxada Frontal');
INSERT INTO `mydb`.`exercicio` (nome_exercicio) VALUES ('Elevação Lateral');
INSERT INTO `mydb`.`exercicio` (nome_exercicio) VALUES ('Abdominal Crunch');
INSERT INTO `mydb`.`exercicio` (nome_exercicio) VALUES ('Bíceps Martelo');
INSERT INTO `mydb`.`exercicio` (nome_exercicio) VALUES ('Prancha Abdominal');
INSERT INTO `mydb`.`exercicio` (nome_exercicio) VALUES ('Agachamento Sumô');


-- Selects das tabelas para teste
select * from usuario;
select * from personal;
select * from exercicio;
select * from grupo_treino;
SELECT * FROM grupo_treino WHERE Usuario_email = 'a@a';
select * from grupo_treino_exercicio;

