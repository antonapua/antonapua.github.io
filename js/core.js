require('./../scss/bundle.scss');
require('./../index.html');

var jQuery = require("jquery");

function scrollTo(location,isMenu){
  console.log(location);
  if(isMenu == true){
    setTimeout(function (){
      jQuery('.menu__burger').click();
    },300)
  }
  jQuery('section.active').addClass('animated').fadeOut('100', function() {
    jQuery(this).removeClass('active animated');
    jQuery(this).find('.page__objects').removeClass('active');
    jQuery('#'+location).addClass('active').hide().fadeIn('100', function(){
        jQuery(this).find('.page__objects').addClass('active');
    });
  });
}
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
  //  slide transtion
   jQuery(window).bind('mousewheel', function(event) {
    if (event.originalEvent.wheelDelta >= 0) {
        slideTransition('prev');
    }
    else {
        slideTransition('next');
    }
  });
  // menu open
  jQuery('.menu__burger').click(function (){
    jQuery(this).toggleClass('active');
    jQuery('.menu__overlay').fadeToggle();
  });
  // scroll to
  jQuery('[data-go]').click( function (){
      var location = jQuery(this).attr('data-go');
      var isMenu = jQuery(this).hasClass('from-menu');
      scrollTo(location,isMenu);
  });
});
