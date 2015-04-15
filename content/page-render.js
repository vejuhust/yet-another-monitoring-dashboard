var _profile;
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

  updateContentPage();
}

function composeContentPage() {
  console.log("composeContentPage");
  // Render gauge row and set data update event
  fetchGauageRowData();
  setTimeTriggerEvents();
}

function updateContentPage() {
  console.log("updateContentPage");
  // Activate menu item as per hashtag
  activateTaggedMenuItems();
  // Update title & status
  _profile = extractEnvPartProfile();
  if (updateContentTitleDesc(_profile)) {
    updateWebpageTitle(_profile);
    addNewSubBoxInStatusBox(_profile);
  }
}
