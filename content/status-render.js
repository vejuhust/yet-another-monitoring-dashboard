
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

function updateGaugeCounter () {
  var _div = $("#gauge-count");
  var _count = parseInt(_div.text()) + 1;
  _div.text(_count);
}

function updateGauageProgress(num) {
  if (num != undefined) {
    _intervalPast = num;
  }
  else {
    _intervalPast += interval_progress;
  }
  updateProgressBar(_intervalPast / interval_fetch);
}

function updateProgressBar(rate) {
  var percent = (rate * 100).toFixed(0);
  $("#progbar-text").text(percent + "%");
  $("#progbar-rate").attr("style", "width: " + percent + "%");
}
