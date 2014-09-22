<?php
//var_dump(Router::namedConfig());
Router::connect('/aoaku/home', array('plugin' => 'aoaku', 'controller' => 'pages', 'action' => 'display', 'home'));
Router::connect('/aoaku/about', array('plugin' => 'aoaku', 'controller' => 'pages', 'action' => 'display', 'about'));
Router::connect('/aoaku/contact', array('plugin' => 'aoaku', 'controller' => 'pages', 'action' => 'display', 'contact'));
Router::connect('/aoaku/privacy', array('plugin' => 'aoaku', 'controller' => 'pages', 'action' => 'display', 'privacy'));
Router::connect('/aoaku/terms', array('plugin' => 'aoaku', 'controller' => 'pages', 'action' => 'display', 'terms'));
Router::connect('/aoaku/channel', array('plugin' => 'aoaku', 'controller' => 'pages', 'action' => 'display', 'channel'));
Router::connect('/aoaku/facebook', array('plugin' => 'aoaku', 'controller' => 'pages', 'action' => 'facebook', 'channel'));
Router::connect('/aoaku/teach_me/*', array('plugin' => 'aoaku', 'controller' => 'teach_me', 'action' => 'search'));

?>