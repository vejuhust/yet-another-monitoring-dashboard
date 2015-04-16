
function addNewSubBoxInStatusBox (profile, _custom) {
  restartStatusBoxIfHidden();
  var _div = $("<div/>", { class: "alert alert-info alert-dismissable" });
  $('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>').appendTo(_div);
  $('<h4><i class="icon fa fa-info"></i> </h4>').append("View Changed at " + $.format.date(new Date(), 'MM/dd/yyyy HH:mm:ss.SSS')).appendTo(_div);
  if (_custom) {
    _div.append($("<div />").append(_custom));
  }
  else {
    _div.append($("<div />").append($("#content-title-desc").html()));
  }
  $("#status-subbox").prepend(_div);
}

function restartStatusBoxIfHidden () {
  if ($("#status-box:hidden").length) {
    $("#status-subbox").empty();
    $("#status-box").show();
  }
}

function updateFetchCounter () {
  var _div = $("#fetch-count");
  _div.text(_data_list.length);
}

function updateFetchProgress(num) {
  var rate;
  if (num != undefined) {
    rate = num / 100;
    _intervalPast = interval_fetch * rate;
  }
  else {
    _intervalPast += interval_progress;
    rate = _intervalPast / interval_update;
  }
  updateProgressBar(rate);
}

function updateProgressBar(rate) {
  var _rate = rate * 100;
  _rate = _rate > 100 ? 100 : _rate;
  var percent = _rate.toFixed(0);
  $("#progbar-text").text(percent + "%");
  $("#progbar-rate").attr("style", "width: " + percent + "%");
}
