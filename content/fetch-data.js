
var _data_list = [];

function fetchDataAndRenderContent () {
  console.log("fetchDataAndRenderContent first time!");
  _data_list = [];
  renderCharts();
  extractDataAndUpdateContent();
}

function extractDataAndUpdateContent () {
  updateFetchProgress(100);

  renderOrUpdateGaugeRowItemsWithAnimation(extractGauageRowData());
  updateCharts(extractChartData());

  updateFetchCounter();
  updateFetchProgress(0);
}

function extractChartData (_limit) {
  var _limit = _limit || 100;
  var _raw_list = _data_list.slice(-_limit);
  var _data_set = {};
  $.each(gauge_data, function (index, item) {
    var _list = [];
    $.each(_raw_list, function (index, record) {
      var _record = {};
      _record.date = $.format.date(record[item.id].time, 'yyyy-MM-dd HH:mm:ss');
      _record.value = _formatReadableFloat(record[item.id].value);
      _list.push(_record);
    });
    _data_set[item.id] = _list;
  });
  return _data_set;
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
  var _set = {};
  var _date = new Date();
  var _last_set = _data_list.length ? _data_list.slice(-1)[0] : undefined;
  $.each(gauge_data, function (index, item) {
    var _item = {};
    _item.time = _date;
    _item.value = _last_set ? _last_set[item.id].value : item.value;
    _item.value *= (1 + (Math.random() - 0.5) * 0.1);
    _set[item.id] = _item;
  });
  _data_list.push(_set);
}
