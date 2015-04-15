var _profile;

function renderMainPage(tag_env, tag_part) {
  _profile = extractEnvPartProfile(tag_env, tag_part);
  if (updateContentTitleDesc(_profile)) {
    updateWebpageTitle(_profile);
    addNewSubBoxInStatusBox(_profile);
  }
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
