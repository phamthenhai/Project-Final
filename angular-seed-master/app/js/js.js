$(document).ready(function(){
    $('[data-toggle=offcanvas]').click(function(){
        $('#wrapper').toggleClass('offcanvas');
    });
    sideNav();
    widthDesc();
});
function sideNav() {
      if ($(window).width() < 700) {
        $('#wrapper').addClass('offcanvas');
      } else {
        $('#wrapper').removeClass('offcanvas');
      }  
}
function widthDesc() {
    var w = $(window).width();
      if ($(window).width() < 350) {
           $('#menu-desc').css('width', w);
      } 
    else{
        $('#menu-desc').css('width', 350);
    }
}
function auto_height(element){
    element.style.height = (element.scrollHeight)+"px";
    var newheight = $('.body-desc').height - (element.scrollHeight + 40);
    $('.body-desc').css("height", newheight);
}

$(window).resize(function() {
   sideNav();
    widthDesc();
});
