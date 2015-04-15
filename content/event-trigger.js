
var _timerIds = {};
var _intervalPast = 0;

function setTimeTriggerEvents() {
  _timerIds.gauge_fetch = setInterval("fetchGauageRowData()", interval_fetch);
  _timerIds.gauge_progress = setInterval("updateGauageProgress()", interval_progress);
}

function clearTimeTriggerEvents() {
  $.each(_timerIds, function (index, _id) {
    clearInterval(_id);
  });
  _timerIds = {};
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
