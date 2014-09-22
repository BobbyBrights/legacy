

DROP TABLE IF EXISTS `news_events_new`.`categories`;
DROP TABLE IF EXISTS `news_events_new`.`config`;
DROP TABLE IF EXISTS `news_events_new`.`experts`;
DROP TABLE IF EXISTS `news_events_new`.`image_types`;
DROP TABLE IF EXISTS `news_events_new`.`images`;
DROP TABLE IF EXISTS `news_events_new`.`item_media_contacts`;
DROP TABLE IF EXISTS `news_events_new`.`item_taxonomies`;
DROP TABLE IF EXISTS `news_events_new`.`items`;
DROP TABLE IF EXISTS `news_events_new`.`media_contacts`;
DROP TABLE IF EXISTS `news_events_new`.`taxonomies`;
DROP TABLE IF EXISTS `news_events_new`.`users`;


CREATE TABLE `news_events_new`.`categories` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`created` datetime NOT NULL,
	`modified` datetime NOT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=InnoDB;

CREATE TABLE `news_events_new`.`config` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`value` text CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
	`created` datetime NOT NULL,
	`modified` datetime NOT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=MyISAM;

CREATE TABLE `news_events_new`.`experts` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`image` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
	`excerpt` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=InnoDB;

CREATE TABLE `news_events_new`.`image_types` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`width` int(11) NOT NULL,
	`height` int(11) NOT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=MyISAM;

CREATE TABLE `news_events_new`.`images` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`item_id` int(11) NOT NULL,
	`image_type` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`path` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=MyISAM;

CREATE TABLE `news_events_new`.`item_media_contacts` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`item_id` int(11) NOT NULL,
	`media_contact_id` int(11) NOT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=MyISAM;

CREATE TABLE `news_events_new`.`item_taxonomies` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`taxonomy_id` int(11) NOT NULL,
	`item_id` int(11) NOT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=MyISAM;

CREATE TABLE `news_events_new`.`items` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`category_id` int(11) NOT NULL,
	`title` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`subtitle` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`excerpt` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`content` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`status` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`user_id` int(11) NOT NULL,
	`publish_date` datetime NOT NULL,
	`created` datetime NOT NULL,
	`modified` datetime NOT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=InnoDB;

CREATE TABLE `news_events_new`.`media_contacts` (
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

CREATE TABLE `news_events_new`.`taxonomies` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`parent_id` int(11) DEFAULT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=MyISAM;

CREATE TABLE `news_events_new`.`users` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
	`username` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
	`password` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
	`full_name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`role` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
	`created` datetime DEFAULT NULL,
	`modified` datetime DEFAULT NULL,	PRIMARY KEY  (`id`)) 	DEFAULT CHARSET=latin1,
	COLLATE=latin1_swedish_ci,
	ENGINE=MyISAM;

