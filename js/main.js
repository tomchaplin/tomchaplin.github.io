// Deals with opening and closing menu

function toggleMenu() {
  menuElem = document.getElementById("topnav");
  if (menuElem.className == "topnav openMenu") {
    document.getElementById("topnav").className = "topnav";
    document.getElementById("myBody").className = "";
    document.getElementById("menu_icon").innerHTML = "menu";
  } else {
    document.getElementById("topnav").className = "topnav openMenu";
    document.getElementById("myBody").className = "openMenu";
    document.getElementById("menu_icon").innerHTML = "close";
  }
}

// Deals with revealing menu button on scroll and hiding on resize

// For detecting whether we're in mobile view
// See https://stackoverflow.com/questions/19291873/window-width-not-the-same-as-media-query
function isMobile() {
  return $('#mobile-indicator').is(':visible');
}

var $win = $(window);
var fadeInTime = 500;
var $socialDiv = $('#footer_socials');
var $elemToAvoid = $('#site_title');

function checkAddSocial() {
    console.log($.windowHeight());
    var out1 = $win.scrollTop() + $.windowHeight();
    var out2 = $socialDiv.offset().top + ( $socialDiv.outerHeight(true) / 2.0 );
    var outStr = out1 + " : " + out2;
    //console.log(outStr);
  if($win.scrollTop() + $.windowHeight() > $socialDiv.offset().top + ( $socialDiv.outerHeight(true) / 2.0 ) ) {
    $socialDiv.addClass("showing");
  }
}

// Check if social div is initially on screen
checkAddSocial();

$win.scroll(function(){
  // Fade the menu icon in after scrolling so we don't black any important titles
  // If we can't scroll then we fade in



  if ( ($win.scrollTop() > $elemToAvoid.offset().top + $elemToAvoid.height() ||
        $.documentHeight()<$.windowHeight() ) && isMobile() ) {
    $('#menu_button').fadeIn(fadeInTime);
  }
  // Fade the socials in when they appear on screen
  checkAddSocial();
});

$win.resize(function() {
  // Check if social div is initially on screen
  checkAddSocial();
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
