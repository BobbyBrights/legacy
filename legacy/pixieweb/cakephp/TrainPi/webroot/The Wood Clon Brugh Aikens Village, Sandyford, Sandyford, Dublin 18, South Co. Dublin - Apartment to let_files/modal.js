
function showModal(modalName,callback){$('#modal_background_'+modalName).css('display','block');$('#modal_container_'+modalName).css('display','block');setModalContainerHeight(modalName);$('#modal_form_'+modalName).submit(function()
{callback();hideModal(modalName);return false;});$('.close_modal, .cancel_modal').click(function(){hideModal(modalName);});$('#modal_background_'+modalName).click(function(){hideModal(modalName);});$(document).keyup(function(event){if(event.keyCode==27)
{hideModal(modalName);}});return false;}
function disableModal(buttonId)
{$("#"+buttonId).unbind("click");}
function hideModal(modalName){$('#modal_background_'+modalName).css("display","none");$('#modal_container_'+modalName).css("display","none");}
function setupSelectorModal(modalName,selector)
{$(selector).each(function(){$(this).click(function(e){showModal(modalName,selector);e.stopPropagation();})});}
function setModalContainerHeight(modalName)
{var offset=20;var scrollTop=$(window).scrollTop()+offset;$('#modal_container_'+modalName).css({top:scrollTop});}
function setupModal(modalName,buttonId,onShow,callback){var submitCallback=callback;$('#'+buttonId).click(function(){setModalContainerHeight(modalName);onShow();$(document).keyup(function(event){if(event.keyCode==27)
{hideModal(modalName);}});$('#modal_background_'+modalName).css("display","block");$('#modal_container_'+modalName).css("display","block");return false;});$('#modal_background_'+modalName).click(function(){hideModal(modalName);});$('.close_modal').click(function(){hideModal(modalName);});$(document).keyup(function(e){if(e.keyCode==27){hideModal(modalName);}});$('.cancel_modal').click(function(){hideModal(modalName);});$('#modal_form_'+modalName).submit(function()
{submitCallback();$("#modal_background_"+modalName).css("display","none");$('#modal_container_'+modalName).css("display","none");return false;});}