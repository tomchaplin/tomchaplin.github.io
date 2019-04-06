// Deals with opening and closing menu

function toggleMenu() {
  menuElem = document.getElementById("topnav");
  if (menuElem.className == "topnav openMenu") {
    document.getElementById("topnav").className = "topnav";
    document.getElementById("myBody").className = "";
    document.getElementById("menu_icon").className = "fas fa-bars";
  } else {
    document.getElementById("topnav").className = "topnav openMenu";
    document.getElementById("myBody").className = "openMenu";
    document.getElementById("menu_icon").className = "fas fa-times";
  }
}


// Deals with revealing menu button on scroll and hiding on resize


var $win = $(window);
var fadeInTime = 500;
var $elemToAvoid = $('#site_title');

function checkAddMenu() {
    // Either we need to have scrolled past the getElementById
    // or the document is so small that we can not scroll 100 pixels past it
    // and we need to be in mobile mode
    if ( ($win.scrollTop() > $elemToAvoid.offset().top + $elemToAvoid.height() ||
          getDocumentHeight() <= getWindowHeight() + $elemToAvoid.height() + 100 ) && isMobile() ) {
      $('#menu_button').fadeIn(fadeInTime);
    }
}

// Check if social div is initially on screen
checkAddMenu();

$win.on("scroll.menu",function(){
  // Fade the menu icon in after scrolling so we don't black any important titles
  // If we can't scroll then we fade in
  checkAddMenu();
  // Fade the socials in when they appear on screen
});

$win.on("resize",function() {
  // Check if social div is initially on screen
  if(!isMobile()){
      // If we're not in mobile then hide the menu button, reset the topnav class and body and make sure the right icon display if we go back to mobile
      $('#menu_button').hide();
      $('#myBody').removeClass("openMenu");
      $('#topnav').removeClass("openMenu");
      $('#menu_icon').html("menu");
    } else{
      // If we resize to mobile then fade the button in
      $('#menu_button').fadeIn(fadeInTime);
    }
})
