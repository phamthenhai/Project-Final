$(document).ready(function(){
    $('[data-toggle=offcanvas]').click(function(){
        $('#wrapper').toggleClass('offcanvas');
    });
   /*$('.edit-form').on('input',function(e){
        $('.edit-form').height(element.scrollHeight);
   });*/
});
function sideNav() {
      if ($(window).width() < 700) {
        $('#wrapper').addClass('offcanvas');
      } else {
        $('#wrapper').removeClass('offcanvas');
      }  
}
function auto_height(element){
     //element.style.height = "10px";
    element.style.height = (element.scrollHeight)+"px";
    var newheight = $('.body-desc').height - (element.scrollHeight + 40);
    $('.body-desc').css("height", newheight);
}

$(window).resize(function() {
   sideNav();
});