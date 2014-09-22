// JavaScript Document
var gallery = new Array();
gallery[1] = new
Array("9.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg");

function pickImageFrom(whichGallery)
{
var idx = Math.floor(Math.random() * gallery[whichGallery].length);
document.write('<img src="' + sjc_var.js_url + '/rotate/' +
gallery[whichGallery][idx] + '">');
}