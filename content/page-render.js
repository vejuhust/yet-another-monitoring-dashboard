var _has_content_page = false;

var _handlerUpdatePage = function (event) {
  console.log("_handlerUpdatePage");
  
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
  console.log("composeDefaultPage ", _timerIds);

  clearTimeTriggerEvents();
  $("#gauge-row").hide();
  $("#status-box").hide();

  renderTitleAndStatus("Welcome!");
}

function composeContentPage() {
  console.log("composeContentPage");
}

function updateContentPage() {
  console.log("updateContentPage");
  renderTitleAndStatus();
  // Render gauge row and reset data update event
  clearTimeTriggerEvents();
  fetchGauageRowData();
  setTimeTriggerEvents();
}
