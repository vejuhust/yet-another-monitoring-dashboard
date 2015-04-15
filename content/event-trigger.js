
var _timerIds = {};

function setTimeTriggerEvents() {
  _timerIds.gauge_fetch = setInterval("renderGaugeRowItems()", interval_fetch);
}

function clearTimeTriggerEvents() {
  $.each(_timerIds, function (index, _id) {
    clearInterval(_id);
  });
  _timerIds = {};
}

function updateProgressBar(rate) {
  var percent = (rate * 100).toFixed(0);
  $("#progbar-text").text(percent + "%");
  $("#progbar-rate").attr("style", "width: " + percent + "%");
}
