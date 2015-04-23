
var _data_list = [];

var partner_data = undefined;
var partner_profile = undefined;

function fetchDataAndRenderContent () {
  _data_list.length = 0;
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
  _limit = _limit || 100;
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

function initializePartnersForCharts () {
  partner_profile = fetchMockupTopPartnersProfile();

  partner_data = $.extend(true, {}, gauge_data);
  $.each(partner_data, function (index, label_data) {
    label_data.name = "Top Partners - " + label_data.name; 
    label_data.id += "-part";
  });
}

function fetchMockupTopPartnersProfile (_limit) {
  _limit = _limit || 5;
  var _list = flattenConfigIntoList(menu_part_data);
  _list.sort(function () { return 0.5 - Math.random() });
  return _list.slice(-_limit);
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
