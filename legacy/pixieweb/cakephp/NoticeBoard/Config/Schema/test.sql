

DROP TABLE IF EXISTS `noticeboard`.`categories`;
DROP TABLE IF EXISTS `noticeboard`.`notices`;
DROP TABLE IF EXISTS `noticeboard`.`roles`;
DROP TABLE IF EXISTS `noticeboard`.`users`;
DROP TABLE IF EXISTS `noticeboard`.`users_notices`;
DROP TABLE IF EXISTS `noticeboard`.`users_roles`;


CREATE TABLE `noticeboard`.`categories` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=InnoDB;

CREATE TABLE `noticeboard`.`notices` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`summary` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`category_id` int(11) NOT NULL,
	`description` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=InnoDB;

CREATE TABLE `noticeboard`.`roles` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=InnoDB;

CREATE TABLE `noticeboard`.`users` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`username` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=InnoDB;

CREATE TABLE `noticeboard`.`users_notices` (
	`user_id` int(11) NOT NULL,
	`notice_id` int(11) NOT NULL	) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=InnoDB;

CREATE TABLE `noticeboard`.`users_roles` (
	`user_id` int(11) NOT NULL,
	`role_id` int(11) NOT NULL	) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=InnoDB;

