
function renderTitleAndStatus (_custom) {
  // Activate menu item as per hashtag
  activateTaggedMenuPath();
  // Update title & status
  updateContentTitleDesc(_page_profile);
  updateWebpageTitle(_page_profile, _custom);
}

function updateContentTitleDesc (profile) {
  var desc = $("<small/>", { id: "content-title-desc" });
  if (profile.region_icon || profile.region_name) {
    $("<i/>", {"class": profile.region_icon}).appendTo(desc);
  }
  if (profile.env_region_name) {
    desc.append(" " + profile.env_region_name);
  }
  if (profile.part_name) {
    desc.append(" - ");
    $("<i/>", {"class": profile.part_icon}).appendTo(desc);
    desc.append(" " + profile.part_name);
  }
  $("#content-title-desc").replaceWith(desc);
  return $("#content-title-desc").html().length > 0;
}

function updateWebpageTitle (profile, _custom) {
  var _title = "YAMD | ";
  if (_custom) {
    _title += _custom;
  }
  else {
    if (profile.env_name) {
      _title += profile.env_name;
    } else if (profile.region_name) {
      _title += profile.region_name;
    }
    if (profile.part_name) {
      _title += " - " + profile.part_name;
    }
  }
  document.title = _title;
}
