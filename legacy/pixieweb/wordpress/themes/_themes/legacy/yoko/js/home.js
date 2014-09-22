$(window).load(function() {
	$('div.Slider_Control').nivoSlider({
        effect:'random',
        slices:15,
        animSpeed:	750,
        pauseTime: 4500,
        directionNav:false, //Next & Prev
        directionNavHide:true, //Only show on hover
        controlNav:false, //1,2,3...
        keyboardNav:true, //Use left & right arrows
        pauseOnHover:true, //Stop animation while hovering
        manualAdvance:false, //Force manual transitions
        captionOpacity:0.8, //Universal caption opacity
        beforeChange: function(){},
        afterChange: function(){},
        slideshowEnd: function(){} //Triggers after all slides have been shown
    }).show();
});
