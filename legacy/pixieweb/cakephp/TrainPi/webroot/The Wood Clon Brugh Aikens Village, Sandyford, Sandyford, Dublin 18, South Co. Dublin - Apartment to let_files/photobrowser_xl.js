
var num_images;var pb_open=false;var pb_page;var slide_speed=10;var photos_seen=0;var img_slide_finished=true;function setup_images(images_in,page_index_in,campaign_in)
{carousel_images=images_in;num_images=carousel_images.length;pb_page=page_index_in;campaign=campaign_in;}
function photoDataToggle(pb_page)
{photos_seen++;if((photos_seen%adConfig['refreshInterval'])==1)
{rotateDFP();}
$("#pbxl_current_photo").text(pb_page);if(pb_captions[pb_page-1].length>0)
{$('#pb_caption').html(pb_captions[pb_page-1]).show();}
else
{$('#pb_caption').hide();}
var url_to_track='/media_browser/';if(campaign.length>0)
{url_to_track='/mb_views/'+campaign+'_mb_campaign'+url_to_track;}
if(typeof _gaq!=='undefined')
{if(typeof _gaq.push=='function')
{_gaq.push(['_trackPageview',url_to_track],['b._trackPageview',url_to_track]);}}
var tempurl=window.location.href;var regex=new RegExp("((http|https)://)([a-zA-Z0-9]+\.)(.*)");var comurl=tempurl.match(regex);var com_tag_url=comurl[3]+comurl[4];COMSCORE.beacon({c1:2,c2:6770180,c3:"",c4:com_tag_url,c5:"",c6:"",c15:""});img_slide_finished=true;}
$(document).ready(function(){$("span[class^=p]").click(function(){if(img_slide_finished==true)
{for(var i=1;i<=num_images;i++)
{if($(this).hasClass("p"+i))
{img_slide_finished=false;var prev_page=pb_page;pb_page=i;photoDataToggle(pb_page);}}}});$("#pbxl_right").click(function(){if(img_slide_finished==true)
{img_slide_finished=false;pb_page=(pb_page%num_images)+1;photoDataToggle(pb_page);}});$("#pbxl_left").click(function(){if(img_slide_finished==true)
{img_slide_finished=false;pb_page=(pb_page%num_images)-1;if(pb_page<1)
{pb_page+=num_images;}
photoDataToggle(pb_page);}});$('#pbxl_close_btn').click(function(){tb_remove();});$(document).keydown(function(e){if(img_slide_finished==true&&e.keyCode==37&&pb_open)
{$("#pbxl_left").trigger('click');}
else if(img_slide_finished==true&&e.keyCode==39&&pb_open)
{$("#pbxl_right").trigger('click');}
return true;});});function rotateDFP()
{if((typeof(branded_agent_id)!=='undefined')&&branded_agent_id!=false&&branded_agent_id>0)
{$.post('/ajax_endpoint.php',{'action':'log_branded_agent_impression','agent_id':branded_agent_id});}
else
{if(googletag&&googletag.pubads)
{googletag.pubads().refresh([googletag.placement.halfbanner]);}}
if(googletag&&googletag.pubads)
{googletag.pubads().refresh([googletag.placement.skyscraper]);}}