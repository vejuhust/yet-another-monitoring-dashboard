
var _timerIds = {};
var _intervalPast = 0;

function setTimeTriggerEvents() {
  _timerIds.gauge_fetch = setInterval("fetchDataAndUpdateContent()", interval_fetch);
  _timerIds.gauge_progress = setInterval("updateGauageProgress()", interval_progress);
}

function clearTimeTriggerEvents() {
  $.each(_timerIds, function (index, _id) {
    clearInterval(_id);
  });
  _timerIds = {};
  updateGauageProgress(0);
}
