
var _timerIds = {};
var _intervalPast = 0;

function setTimeTriggerEvents() {
  _timerIds.fetch = setInterval("fetchMockupData()", interval_fetch);
  _timerIds.update = setInterval("extractDataAndUpdateContent()", interval_update);
  _timerIds.progress = setInterval("updateFetchProgress()", interval_progress);
}

function clearTimeTriggerEvents() {
  $.each(_timerIds, function (index, _id) {
    clearInterval(_id);
  });
  _timerIds = {};
  updateFetchProgress(0);
}
