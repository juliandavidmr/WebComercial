-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.12-log - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura de base de datos para independiente
CREATE DATABASE IF NOT EXISTS `independiente` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `independiente`;


-- Volcando estructura para tabla independiente.categoria
CREATE TABLE IF NOT EXISTS `categoria` (
  `idCategoria` int(11) NOT NULL AUTO_INCREMENT,
  `NombreCategoria` varchar(100) NOT NULL,
  `Estado` enum('T','F') NOT NULL,
  PRIMARY KEY (`idCategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla independiente.categoria: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;


-- Volcando estructura para tabla independiente.ciudad
CREATE TABLE IF NOT EXISTS `ciudad` (
  `idCiudad` int(11) NOT NULL,
  `NombreCiudad` varchar(45) NOT NULL,
  `FK_idDpto` int(11) NOT NULL,
  PRIMARY KEY (`idCiudad`),
  KEY `fk_ciudad_departamento1_idx` (`FK_idDpto`),
  CONSTRAINT `fk_ciudad_departamento1` FOREIGN KEY (`FK_idDpto`) REFERENCES `departamento` (`idDpto`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla independiente.ciudad: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `ciudad` DISABLE KEYS */;
INSERT INTO `ciudad` (`idCiudad`, `NombreCiudad`, `FK_idDpto`) VALUES
	(1, 's', 1);
/*!40000 ALTER TABLE `ciudad` ENABLE KEYS */;


-- Volcando estructura para tabla independiente.comerciantes
CREATE TABLE IF NOT EXISTS `comerciantes` (
  `idComerciante` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Descripcion` text,
  `Correo` varchar(100) NOT NULL,
  `PaginaWeb` varchar(100) DEFAULT NULL,
  `Telefono` bigint(20) NOT NULL,
  `Direccion` varchar(100) NOT NULL,
  `Latitud` varchar(100) DEFAULT NULL,
  `Longitud` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idComerciante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla independiente.comerciantes: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `comerciantes` DISABLE KEYS */;
/*!40000 ALTER TABLE `comerciantes` ENABLE KEYS */;


-- Volcando estructura para tabla independiente.cuenta
CREATE TABLE IF NOT EXISTS `cuenta` (
  `idCuenta` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(45) NOT NULL,
  `Password` text NOT NULL,
  `Estado` enum('T','F') NOT NULL,
  `FK_idRol` int(11) NOT NULL,
  `FK_idPersona` bigint(20) NOT NULL,
  PRIMARY KEY (`idCuenta`),
  KEY `fk_cuenta_rol_idx` (`FK_idRol`),
  KEY `fk_cuenta_persona1_idx` (`FK_idPersona`),
  CONSTRAINT `fk_cuenta_persona1` FOREIGN KEY (`FK_idPersona`) REFERENCES `persona` (`idPersona`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_cuenta_rol` FOREIGN KEY (`FK_idRol`) REFERENCES `rol` (`idRol`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla independiente.cuenta: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `cuenta` DISABLE KEYS */;
INSERT INTO `cuenta` (`idCuenta`, `Username`, `Password`, `Estado`, `FK_idRol`, `FK_idPersona`) VALUES
	(1, 'admin', '$2a$10$yr2tzaCiiiyIb4u4zkgVh.H0CQ3zNi8Bl.8F6vQz5B36cQVqMFqr.', 'T', 1, 2);
/*!40000 ALTER TABLE `cuenta` ENABLE KEYS */;


-- Volcando estructura para tabla independiente.departamento
CREATE TABLE IF NOT EXISTS `departamento` (
  `idDpto` int(11) NOT NULL,
  `NombreDpto` varchar(45) NOT NULL,
  PRIMARY KEY (`idDpto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla independiente.departamento: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
INSERT INTO `departamento` (`idDpto`, `NombreDpto`) VALUES
	(1, 's');
/*!40000 ALTER TABLE `departamento` ENABLE KEYS */;


-- Volcando estructura para tabla independiente.menu
CREATE TABLE IF NOT EXISTS `menu` (
  `FK_idRol` int(11) NOT NULL,
  `FK_idPermiso` int(11) NOT NULL,
  `Estado` enum('T','F') NOT NULL,
  PRIMARY KEY (`FK_idRol`,`FK_idPermiso`),
  KEY `fk_rol_has_permisos_permisos1_idx` (`FK_idPermiso`),
  KEY `fk_rol_has_permisos_rol1_idx` (`FK_idRol`),
  CONSTRAINT `fk_rol_has_permisos_permisos1` FOREIGN KEY (`FK_idPermiso`) REFERENCES `permisos` (`idPermiso`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_rol_has_permisos_rol1` FOREIGN KEY (`FK_idRol`) REFERENCES `rol` (`idRol`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla independiente.menu: ~8 rows (aproximadamente)
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` (`FK_idRol`, `FK_idPermiso`, `Estado`) VALUES
	(1, 1, 'T'),
	(1, 2, 'T'),
	(1, 3, 'T'),
	(1, 4, 'T'),
	(2, 1, 'F'),
	(2, 2, 'F'),
	(2, 3, 'T'),
	(2, 4, 'F');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;


-- Volcando estructura para tabla independiente.permisos
CREATE TABLE IF NOT EXISTS `permisos` (
  `idPermiso` int(11) NOT NULL AUTO_INCREMENT,
  `NombrePermiso` varchar(50) NOT NULL,
  `URL` varchar(45) NOT NULL,
  `Icono` varchar(45) NOT NULL,
  PRIMARY KEY (`idPermiso`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla independiente.permisos: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `permisos` DISABLE KEYS */;
INSERT INTO `permisos` (`idPermiso`, `NombrePermiso`, `URL`, `Icono`) VALUES
	(1, 'Publicidad', '../publicidad/create_plan', 's'),
	(2, 'Comerciantes', '../comerciantes/create', 'd'),
	(3, 'Servicios', '../servicios/gestionar', 'd'),
	(4, 'Usuarios', '../usuarios/register', 'f');
/*!40000 ALTER TABLE `permisos` ENABLE KEYS */;


-- Volcando estructura para tabla independiente.persona
CREATE TABLE IF NOT EXISTS `persona` (
  `idPersona` bigint(20) NOT NULL AUTO_INCREMENT,
  `Identificacion` bigint(20) NOT NULL,
  `Nombres` varchar(45) NOT NULL,
  `Apellidos` varchar(45) NOT NULL,
  `Direccion` varchar(45) DEFAULT NULL,
  `Correo` varchar(45) NOT NULL,
  `FK_idCiudad` int(11) NOT NULL,
  PRIMARY KEY (`idPersona`),
  KEY `fk_persona_ciudad1_idx` (`FK_idCiudad`),
  CONSTRAINT `fk_persona_ciudad1` FOREIGN KEY (`FK_idCiudad`) REFERENCES `ciudad` (`idCiudad`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla independiente.persona: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` (`idPersona`, `Identificacion`, `Nombres`, `Apellidos`, `Direccion`, `Correo`, `FK_idCiudad`) VALUES
	(2, 1080364988, 'YILVER ESTIVEN', 'MOLINA HURTATIZ', 'Calle 12A', 'yestiben-19@hotmail.com', 1);
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;


-- Volcando estructura para procedimiento independiente.pr_actualizar_menu
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `pr_actualizar_menu`(IN idsub INT)
BEGIN
	DECLARE v_finished INTEGER DEFAULT 0;
	DECLARE idrol INT;
	DECLARE resultado CURSOR FOR SELECT r.idRol FROM independiente.rol r;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_finished = 1;
	OPEN resultado;
		resultado_loop: LOOP
		FETCH resultado INTO idrol;
			IF v_finished = 1 THEN 
				LEAVE resultado_loop;
			END IF;
			INSERT INTO independiente.menu (FK_idRol,FK_idPermiso, Estado) VALUES (idrol,idsub,'F');
		END LOOP resultado_loop;
	CLOSE resultado;
END//
DELIMITER ;


-- Volcando estructura para procedimiento independiente.pr_actualizar_permisos
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `pr_actualizar_permisos`(IN idrol INT)
BEGIN
	DECLARE v_finished INTEGER DEFAULT 0;
	DECLARE idsub INT;
	DECLARE resultado CURSOR FOR SELECT sp.idSubpermiso FROM independiente.subpermisos sp;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_finished = 1;
	OPEN resultado;
		resultado_loop: LOOP
		FETCH resultado INTO idsub;
			IF v_finished = 1 THEN 
				LEAVE resultado_loop;
			END IF;
			INSERT INTO independiente.menu (FK_idRol,FK_idSubpermiso, Estado) VALUES (idrol,idsub,'F');
		END LOOP resultado_loop;
	CLOSE resultado;
END//
DELIMITER ;


-- Volcando estructura para tabla independiente.publicidad
CREATE TABLE IF NOT EXISTS `publicidad` (
  `idPublicidad` bigint(20) NOT NULL,
  `FK_idPublicidad` int(11) NOT NULL,
  `FK_idComerciante` int(11) NOT NULL,
  `Fecha` datetime NOT NULL,
  `Estado` enum('T','F') NOT NULL,
  `FK_idCuenta` int(11) NOT NULL,
  PRIMARY KEY (`FK_idPublicidad`,`FK_idComerciante`,`idPublicidad`),
  KEY `fk_publicidad_has_comerciantes_comerciantes1_idx` (`FK_idComerciante`),
  KEY `fk_publicidad_has_comerciantes_publicidad1_idx` (`FK_idPublicidad`),
  KEY `fk_publicidad_cuenta1_idx` (`FK_idCuenta`),
  CONSTRAINT `fk_publicidad_cuenta1` FOREIGN KEY (`FK_idCuenta`) REFERENCES `cuenta` (`idCuenta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_publicidad_has_comerciantes_comerciantes1` FOREIGN KEY (`FK_idComerciante`) REFERENCES `comerciantes` (`idComerciante`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_publicidad_has_comerciantes_publicidad1` FOREIGN KEY (`FK_idPublicidad`) REFERENCES `tipo_publicidad` (`idPublicidad`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla independiente.publicidad: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `publicidad` DISABLE KEYS */;
/*!40000 ALTER TABLE `publicidad` ENABLE KEYS */;


-- Volcando estructura para tabla independiente.registro_categoria
CREATE TABLE IF NOT EXISTS `registro_categoria` (
  `FK_idComerciante` int(11) NOT NULL,
  `FK_idCategoria` int(11) NOT NULL,
  `Estado` enum('T','F') NOT NULL,
  PRIMARY KEY (`FK_idComerciante`,`FK_idCategoria`),
  KEY `fk_comerciantes_has_categoria_categoria1_idx` (`FK_idCategoria`),
  KEY `fk_comerciantes_has_categoria_comerciantes1_idx` (`FK_idComerciante`),
  CONSTRAINT `fk_comerciantes_has_categoria_categoria1` FOREIGN KEY (`FK_idCategoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_comerciantes_has_categoria_comerciantes1` FOREIGN KEY (`FK_idComerciante`) REFERENCES `comerciantes` (`idComerciante`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla independiente.registro_categoria: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `registro_categoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `registro_categoria` ENABLE KEYS */;


-- Volcando estructura para tabla independiente.rol
CREATE TABLE IF NOT EXISTS `rol` (
  `idRol` int(11) NOT NULL AUTO_INCREMENT,
  `NombreRol` varchar(45) NOT NULL,
  PRIMARY KEY (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla independiente.rol: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` (`idRol`, `NombreRol`) VALUES
	(1, 'Administrador'),
	(2, 'Comerciante');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;


-- Volcando estructura para tabla independiente.servicios
CREATE TABLE IF NOT EXISTS `servicios` (
  `idServicio` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` text NOT NULL,
  `Valor` bigint(20) NOT NULL,
  `Estado` enum('T','F') NOT NULL,
  `FK_idComerciante` int(11) NOT NULL,
  PRIMARY KEY (`idServicio`),
  KEY `fk_servicios_comerciantes1_idx` (`FK_idComerciante`),
  CONSTRAINT `fk_servicios_comerciantes1` FOREIGN KEY (`FK_idComerciante`) REFERENCES `comerciantes` (`idComerciante`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla independiente.servicios: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;


-- Volcando estructura para tabla independiente.tipo_publicidad
CREATE TABLE IF NOT EXISTS `tipo_publicidad` (
  `idPublicidad` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` text NOT NULL,
  `ValorMensual` bigint(20) NOT NULL,
  `Estado` enum('T','F') NOT NULL,
  `Puntaje` int(11) NOT NULL,
  PRIMARY KEY (`idPublicidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla independiente.tipo_publicidad: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `tipo_publicidad` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_publicidad` ENABLE KEYS */;


-- Volcando estructura para disparador independiente.tr_actualizar_menu
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `tr_actualizar_menu` AFTER INSERT ON `permisos` FOR EACH ROW BEGIN
	CALL pr_actualizar_menu(NEW.idPermiso);
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;


-- Volcando estructura para disparador independiente.tr_actualizar_permisos
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `tr_actualizar_permisos` AFTER INSERT ON `rol` FOR EACH ROW BEGIN
	CALL pr_actualizar_permisos(NEW.idRol);
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
