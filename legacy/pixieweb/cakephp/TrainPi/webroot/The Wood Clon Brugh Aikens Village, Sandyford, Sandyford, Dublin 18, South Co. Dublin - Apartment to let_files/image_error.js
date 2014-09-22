function addImageErrorHandlers()
{if(typeof(jQuery)!='undefined')
{jQuery('img.image_error').removeClass("image_error").error(function(){var failoverImage=jQuery(this).next('span.image_error');if(1==failoverImage.length&&failoverImage.attr('title')!==undefined&&failoverImage.attr('title').length>0)
{jQuery(this).attr('src',failoverImage.attr('title'));failoverImage.remove();}});}}