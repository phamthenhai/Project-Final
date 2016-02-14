$(document).ready(function(){
    $('[data-toggle=offcanvas]').click(function(){
        $('#wrapper').toggleClass('offcanvas');
    })
});
function sideNav() {
      if ($(window).width() < 700) {
        $('#wrapper').addClass('offcanvas');
      } else {
        $('#wrapper').removeClass('offcanvas');
      }  
}

$(window).resize(function() {
   sideNav();
});