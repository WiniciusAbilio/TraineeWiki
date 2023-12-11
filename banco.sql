-- MySQL Script generated by MySQL Workbench
-- Sat Dec  9 19:11:20 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb3 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`exercicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`exercicio` (
  `Codigo_Exercicio` INT NOT NULL AUTO_INCREMENT,
  `nome_exercicio` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Codigo_Exercicio`))
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`usuario` (
  `email` VARCHAR(100) NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(32) NOT NULL,
  `altura` VARCHAR(4) NOT NULL,
  `peso` VARCHAR(6) NOT NULL,
  `data_nascimento` DATE NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  `genero` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(250) NULL DEFAULT NULL,
  `telefone` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`grupo_treino`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`grupo_treino` (
  `Usuario_email` VARCHAR(100) NOT NULL,
  `nome_grupo_treino` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Usuario_email`, `nome_grupo_treino`),
  INDEX `Usuario_email` (`Usuario_email` ASC) VISIBLE,
  CONSTRAINT `treino_ibfk_1`
    FOREIGN KEY (`Usuario_email`)
    REFERENCES `mydb`.`usuario` (`email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`grupo_treino_exercicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`grupo_treino_exercicio` (
  `exercicio_CodigoExercicio` INT NOT NULL,
  `repeticoes` INT NOT NULL,
  `series` INT NOT NULL,
  `grupo_treino_Usuario_email` VARCHAR(100) NOT NULL,
  `grupo_treino_nome_grupo_treino` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`exercicio_CodigoExercicio`, `grupo_treino_Usuario_email`, `grupo_treino_nome_grupo_treino`),
  INDEX `fk_grupo_treino_has_exercicio_exercicio1_idx` (`exercicio_CodigoExercicio` ASC) VISIBLE,
  INDEX `fk_grupo_treino_exercicio_grupo_treino1_idx` (`grupo_treino_Usuario_email` ASC, `grupo_treino_nome_grupo_treino` ASC) VISIBLE,
  CONSTRAINT `fk_grupo_treino_has_exercicio_exercicio1`
    FOREIGN KEY (`exercicio_CodigoExercicio`)
    REFERENCES `mydb`.`exercicio` (`Codigo_Exercicio`),
  CONSTRAINT `fk_grupo_treino_exercicio_grupo_treino1`
    FOREIGN KEY (`grupo_treino_Usuario_email` , `grupo_treino_nome_grupo_treino`)
    REFERENCES `mydb`.`grupo_treino` (`Usuario_email` , `nome_grupo_treino`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`match`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`match` (
  `usuario_email` VARCHAR(100) NOT NULL,
  `usuario_email2` VARCHAR(100) NOT NULL,
  `aceito` ENUM('aceito', 'recusado', 'esperando') NOT NULL,
  PRIMARY KEY (`usuario_email`, `usuario_email2`),
  INDEX `fk_match_usuario1_idx` (`usuario_email` ASC) VISIBLE,
  INDEX `fk_match_usuario2_idx` (`usuario_email2` ASC) VISIBLE,
  CONSTRAINT `fk_match_usuario1`
    FOREIGN KEY (`usuario_email`)
    REFERENCES `mydb`.`usuario` (`email`),
  CONSTRAINT `fk_match_usuario2`
    FOREIGN KEY (`usuario_email2`)
    REFERENCES `mydb`.`usuario` (`email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`personal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`personal` (
  `cpf` CHAR(11) NOT NULL,
  `usuario_email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`usuario_email`),
  UNIQUE INDEX `cpf` (`cpf` ASC) VISIBLE,
  CONSTRAINT `fk_personal_usuario1`
    FOREIGN KEY (`usuario_email`)
    REFERENCES `mydb`.`usuario` (`email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
