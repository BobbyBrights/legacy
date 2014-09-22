<?php 
Configure::write('wt_in_test_mode', true);

// Default Admin details
Configure::write('WebtextAdmin.user', 'admin');
Configure::write('WebtextAdmin.pass', '123text$');

// API Settings
Configure::write('WebtextAPI.base', 'https://api.webtext.three.ie/three-webtext/v1/');

// Core settings
Configure::write('Security.level', 'medium');
Configure::write('Session.save', 'session_handler');
?>