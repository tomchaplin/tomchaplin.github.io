var $socialDiv = $('#footer_socials');

var checkAddSocial = function() {
    var out1 = $(window).scrollTop() + getWindowHeight();
    var out2 = $socialDiv.offset().top + ( $socialDiv.outerHeight(true) / 2.0 );
    var outStr = out1 + " : " + out2;
    if(out1 > out2 ) {
        $socialDiv.addClass("showing");
    }
}

checkAddSocial();

$(window).on("scroll.socials",checkAddSocial);
$(window).on("resize.socials",checkAddSocial);
