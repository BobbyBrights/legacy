jQuery(document).ready(function($) {
  if ($.browser.msie && $.browser.version.substr(0,1)<7) {
    $('img,.wp-caption').each(function(e) {
      var w = $(this).width();
      var h = $(this).height();
      if (w > 525) {
        $(this).width(525);
        $(this).height(h / (w / 525));
      }
    });
  }
});