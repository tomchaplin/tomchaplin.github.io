// For detecting whether we're in mobile view
// See https://stackoverflow.com/questions/19291873/window-width-not-the-same-as-media-query
function isMobile() {
  return $('#mobile-indicator').is(':visible');
}

function getWindowHeight() {
    return $.windowHeight();
}

function getDocumentHeight() {
    return $.documentHeight();
}
