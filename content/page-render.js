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
  removeChartBoxes();

  renderTitleAndStatus("Welcome!");
}

function composeContentPage() {
}

function updateContentPage() {
  // Update title and add status box
  renderTitleAndStatus();
  // Show partners menu
  $("#menu-part").fadeIn();
  // Reset data update event, and fetch data to render content
  clearTimeTriggerEvents();
  fetchDataAndRenderContent();
  setTimeTriggerEvents();
}
