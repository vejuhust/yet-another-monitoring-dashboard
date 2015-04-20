
var _data_list = [];

function fetchDataAndRenderContent () {
  console.log("fetchDataAndRenderContent first time!");
  _data_list = [];
  renderCharts();
  extractDataAndUpdateContent();
}

function extractDataAndUpdateContent () {
  updateFetchProgress(100);

  renderGaugeRowItemsWithAnimation(extractGauageRowData());
  updateCharts();

  updateFetchCounter();
  updateFetchProgress(0);
}

function extractGauageRowData () {
  if (!_data_list.length) {
    fetchMockupData();
  }
  var _set = _data_list.slice(-1)[0];
  var _data = $.extend(true, {}, gauge_data);
  $.each(_data, function (index, item) {
    item.time = _set[item.id].time;
    item.value = _set[item.id].value;
  });
  return _data;
}

function fetchMockupData () {
  var _set = [];
  $.each(gauge_data, function (index, item) {
    var _item = {};
    _item.time = new Date();
    _item.value = item.value * (1 + (Math.random() - 0.5) * 0.1);
    _set[item.id] = _item;
  });
  _data_list.push(_set);
}
