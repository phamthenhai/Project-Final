$(document).ready(function(){
    $('[data-toggle=offcanvas]').click(function(){
        $('#wrapper').toggleClass('offcanvas');
    });
    $('.datetimepicker').datetimepicker();

});
function sideNav() {
      if ($(window).width() < 700) {
        $('#wrapper').addClass('offcanvas');
      } else {
        $('#wrapper').removeClass('offcanvas');
      }  
}
function auto_height(element){
     element.style.height = "10px";
    element.style.height = (element.scrollHeight)+"px";
}

$(window).resize(function() {
   sideNav();
});