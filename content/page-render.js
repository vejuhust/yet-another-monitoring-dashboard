var _profile;

function renderMainPage(tag_env, tag_part) {
  _profile = extractEnvPartProfile(tag_env, tag_part);
  if (updateContentTitleDesc(_profile)) {
    updateWebpageTitle(_profile);
    addNewSubBoxInStatusBox(_profile);
  }
}

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

function restartStatusBoxIfHidden () {
  if ($("#status-box:hidden").length) {
    $("#status-subbox").empty();
    $("#status-box").show();
  }
}

function addNewSubBoxInStatusBox (profile) {
  restartStatusBoxIfHidden();
  var _div = $("<div/>", { class: "alert alert-info alert-dismissable" });
  $('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>').appendTo(_div);
  $('<h4><i class="icon fa fa-info"></i> </h4>').append("View Changed at " + $.format.date(new Date(), 'MM/dd/yyyy HH:mm:ss')).appendTo(_div);
  _div.append($("<div />").append($("#content-title-desc").html()));
  $("#status-subbox").prepend(_div);
}
