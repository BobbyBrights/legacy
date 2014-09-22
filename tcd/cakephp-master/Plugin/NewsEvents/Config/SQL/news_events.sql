

DROP TABLE IF EXISTS `news_events_db`.`categories`;
DROP TABLE IF EXISTS `news_events_db`.`config`;
DROP TABLE IF EXISTS `news_events_db`.`experts`;
DROP TABLE IF EXISTS `news_events_db`.`image_types`;
DROP TABLE IF EXISTS `news_events_db`.`images`;
DROP TABLE IF EXISTS `news_events_db`.`item_media_contacts`;
DROP TABLE IF EXISTS `news_events_db`.`item_taxonomies`;
DROP TABLE IF EXISTS `news_events_db`.`items`;
DROP TABLE IF EXISTS `news_events_db`.`media_contacts`;
DROP TABLE IF EXISTS `news_events_db`.`taxonomies`;
DROP TABLE IF EXISTS `news_events_db`.`users`;


CREATE TABLE `news_events_db`.`categories` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`created` datetime NOT NULL,
	`modified` datetime NOT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=InnoDB;

CREATE TABLE `news_events_db`.`config` (
	`name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`value` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
	`created` datetime NOT NULL,
	`modified` datetime NOT NULL,
	`id` int(11) DEFAULT NULL,	PRIMARY KEY  (`name`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=MyISAM;

CREATE TABLE `news_events_db`.`experts` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`image` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
	`excerpt` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=InnoDB;

CREATE TABLE `news_events_db`.`image_types` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`width` int(11) NOT NULL,
	`height` int(11) NOT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=MyISAM;

CREATE TABLE `news_events_db`.`images` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`item_id` int(11) NOT NULL,
	`image_type` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`path` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=MyISAM;

CREATE TABLE `news_events_db`.`item_media_contacts` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`item_id` int(11) NOT NULL,
	`media_contact_id` int(11) NOT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=MyISAM;

CREATE TABLE `news_events_db`.`item_taxonomies` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`taxonomy_id` int(11) NOT NULL,
	`item_id` int(11) NOT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=MyISAM;

CREATE TABLE `news_events_db`.`items` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`parent_id` int(11) DEFAULT NULL COMMENT 'For unary relationship',
	`category_id` int(11) NOT NULL,
	`title` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`subtitle` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
	`excerpt` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`content` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`status` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`lang` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
	`user_id` int(11) NOT NULL,
	`expert_id` int(11) DEFAULT 0,
	`publish_date` datetime NOT NULL,
	`event_date` datetime DEFAULT NULL,
	`created` datetime NOT NULL,
	`modified` datetime NOT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=InnoDB;

CREATE TABLE `news_events_db`.`media_contacts` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`role` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`phone` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`fax` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`email` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`created` datetime NOT NULL,
	`modified` datetime NOT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=MyISAM;

CREATE TABLE `news_events_db`.`taxonomies` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`parent_id` int(11) DEFAULT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=MyISAM;

CREATE TABLE `news_events_db`.`users` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
	`username` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
	`password` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
	`full_name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`role` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
	`created` datetime DEFAULT NULL,
	`modified` datetime DEFAULT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=MyISAM;

