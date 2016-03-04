$(document).ready(function(){
    $('[data-toggle=offcanvas]').click(function(){
        $('#wrapper').toggleClass('offcanvas');
        console.log("sdsf");
    });
    /*$('#menu-toggle').click(function(){
        $('#wrapper').toggleClass('offcanvas');
        console.log("sdsf");
    });*/
    /*$('#menu-toggle').click(function(){
        console.log("sdsf");
        return false;
    });*/
    sideNav();
    widthDesc();
    $('#dob').pickadate({
        format: 'mm/dd/yyyy',
        formatSubmit: 'mm/dd/yyyy',
        hiddenName: true
    });

     
});
function sideNav() {
      if ($(window).width() < 700) {
        $('#wrapper').addClass('offcanvas');
      } else {
        $('#wrapper').removeClass('offcanvas');
      }  
}
function sideBar() {
     /* $('#menu-toggle' ).click(function(){
        $('#wrapper').toggleClass('offcanvas');
        console.log("sdsf");
    });*/
    $('[data-toggle=offcanvas]').click(function(){
        $('#wrapper').toggleClass('offcanvas');
        console.log("sdsf");
    });
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
    var text = document.getElementById('ip').value.replace(/\s+$/g,"") 
 var split = text.split("\n") 
 console.log( split.length );
}

$(window).resize(function() {
   sideNav();
    widthDesc();
    var t = $('.body-desc').outerHeight();
        var t1 = $('#ip').outerHeight();
        var t3 = $(window).height();
        $('.body-desc').css("height", t3-t1-100);
});
