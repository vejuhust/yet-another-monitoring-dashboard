var _has_content_page = false;

var _handlerUpdatePage = function (event) {
  updatePageProfile();
  if (hasHasTagInUrl()) {
    // Render or update content if it meant to be 
    if (!_has_content_page) {
      composeContentPage();
      _has_content_page = true;
    }
    updateContentPage();
  }
  else {
    // Render the default page
    composeDefaultPage();
  }
};

function composeDefaultPage() {
  _has_content_page = false;

  clearTimeTriggerEvents();
  $("#gauge-row").hide();
  $("#menu-part").fadeOut();
  $("#default-carousel-box").show();
  $("#default-map-box").show();
  removeChartBoxes();

  renderTitleAndStatus("Welcome!");
}

function composeContentPage() {
  $("#default-carousel-box").hide();
  $("#default-map-box").hide();
}

function updateContentPage() {
  // Update title and status areas
  renderTitleAndStatus();
  $("#fetch-count-content").empty();
  updateBookmarkCounter();
  // Show partners menu
  $("#menu-part").fadeIn();
  // Reset data update event, and fetch data to render content
  clearTimeTriggerEvents();
  fetchDataAndRenderContent();
  setTimeTriggerEvents();
}
