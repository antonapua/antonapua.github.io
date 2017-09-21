require('./../scss/bundle.scss');
require('./../../index.html');

var jQuery = require("jquery");


function slideTransition(direction){
  var current = jQuery('section.active');
  if(jQuery('section').hasClass('animated')){
    // if the page is moving do nothing
    return;
  }
  if( jQuery(current)[direction]('section').length > 0){
    jQuery(current).addClass('animated').fadeOut('300',function (){
      jQuery(this).removeClass('active animated');
      jQuery(this).find('.page__objects').removeClass('active');

      jQuery(current)[direction]('section').addClass('active').hide().fadeIn('300', function(){
          jQuery(this).find('.page__objects').addClass('active');
      });
    });
  }
}
jQuery(document).ready(function (){
   jQuery('section').stop().clearQueue();
   jQuery(window).bind('mousewheel', function(event) {
    if (event.originalEvent.wheelDelta >= 0) {
        slideTransition('prev');
    }
    else {
        slideTransition('next');
    }
});
});
