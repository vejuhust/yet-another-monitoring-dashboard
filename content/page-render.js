var _profile;
var _timerIdUpdateGaugeRow;
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
  console.log("composeDefaultPage " + _timerIdUpdateGaugeRow);

  if (_timerIdUpdateGaugeRow) {
    clearInterval(_timerIdUpdateGaugeRow);
    _timerIdUpdateGaugeRow = undefined;
  }

  updateContentPage();
  $("#gauge-row").hide();
  $("#status-box").hide();
}

function composeContentPage() {
  console.log("composeContentPage");
  // Render gauge row and set data update event
  renderGaugeRowItems();
  _timerIdUpdateGaugeRow = setInterval("renderGaugeRowItems()", interval_fetch);
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
