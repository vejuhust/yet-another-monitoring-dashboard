
function updateContentTitleDesc (profile) {
  var desc = $("<small/>", { id: "content-title-desc" });
  if (profile.region_icon || profile.region_name) {
    $("<i/>", {"class": profile.region_icon}).appendTo(desc);
  }
  if (profile.env_name) {
    desc.append(" " + profile.env_name);
  }
  else if (profile.region_name) {
    desc.append(" " + profile.region_name);
  }
  if (profile.part_name) {
    desc.append(" - ");
    $("<i/>", {"class": profile.part_icon}).appendTo(desc);
    desc.append(" " + profile.part_name);
  }
  $("#content-title-desc").replaceWith(desc);
  return $("#content-title-desc").html().length > 0;
}

function updateWebpageTitle (profile) {
  var _title = "EGMD | ";
  if (profile.env_name) {
    _title += profile.env_name;
  } else if (profile.region_name) {
    _title += profile.region_name;
  }
  if (profile.part_name) {
    _title += " - " + profile.part_name;
  }
  document.title = _title;
}
