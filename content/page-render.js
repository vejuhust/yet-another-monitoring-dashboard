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
  console.log("composeDefaultPage " + _has_content_page);
  updateContentPage();
  $("#gauge-row").hide();
  $("#status-box").hide();
}

function composeContentPage() {
  console.log("composeContentPage");
  renderGaugeRowItems();
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
