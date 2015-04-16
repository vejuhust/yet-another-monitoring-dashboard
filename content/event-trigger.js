
var _timerIds = {};
var _intervalPast = 0;

function setTimeTriggerEvents() {
  _timerIds.fetch = setInterval("fetchDataAndUpdateContent()", interval_fetch);
  _timerIds.progress = setInterval("updateFetchProgress()", interval_progress);
}

function clearTimeTriggerEvents() {
  $.each(_timerIds, function (index, _id) {
    clearInterval(_id);
  });
  _timerIds = {};
  updateFetchProgress(0);
}
