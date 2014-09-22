<?php 
session_start();
$s = file_get_contents('http://webtext.three.ie/processLogin.jsp?mobile=0830033330&pin=26296&serviceId=19088&originCountryPrefix=353');
echo $s;

$msg = "This is a test message."; 

$recipient = "353830033330";

$dmp = file_get_contents('http://webtext.three.ie/processSendMessage.jsp?command=send&group=&Msg1='.$msg.'&grpSTR=&ConSTR=&msisdn='.$recipient.'&country=353&NumMessag…');

?>