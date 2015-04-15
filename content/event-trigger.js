
var _timerIdUpdateGaugeRow;

function setTimeTriggerEvents() {
  _timerIdUpdateGaugeRow = setInterval("renderGaugeRowItems()", interval_fetch);
}

function clearTimeTriggerEvents() {
  if (_timerIdUpdateGaugeRow) {
    clearInterval(_timerIdUpdateGaugeRow);
    _timerIdUpdateGaugeRow = undefined;
  }
}
