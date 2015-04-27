
var _data_list = [];

var partner_data = undefined;
var partner_profile = undefined;
var partner_limit = 5;

function fetchDataAndRenderContent () {
  _data_list.length = 0;
  renderCharts();
  extractDataAndUpdateContent();
}

function extractDataAndUpdateContent () {
  updateFetchProgress(100);

  switch (_page_profile.page_type) {
    case "environment":
      renderOrUpdateGaugeRowItemsWithAnimation(extractGauageRowData());
      updateCharts(extractChartData());
      break;
    case "region":
      break;
    case "global":
      break;
  }

  updateFetchCounter();
  updateFetchProgress(0);
}

function extractChartData (_record_limit) {
  _record_limit = _record_limit || 100;
  var _value_limit = _page_profile.env_count || 5;
  var _raw_list = _data_list.slice(-_record_limit);
  var _data_set = {};

  $.each(gauge_data, function (index, item) {
    var _list = [];
    $.each(_raw_list, function (index, record) {
      var _record = {};
      _record.date = $.format.date(record[item.id].time, 'yyyy-MM-dd HH:mm:ss');
      _record.value = formatReadableFloat(record[item.id].value);
      var _total = 0;
      for (var i = 0; i < _value_limit; i++) {
        var _value = (record[item.id].rand[i % 3] + (_value_limit - i)/(_value_limit * 2.5)) * record[item.id].value; 
        _record["value" + i] = formatReadableFloat(_value);
        _total += _value;
      }
      _record["total"] = formatReadableFloat(_total); 
      _list.push(_record);
    });
    _data_set[item.id] = _list;
  });

  $.each(partner_data, function (index, item) {
    var _list = [];
    $.each(_raw_list, function (index, record) {
      var _record = {};
      _record.date = $.format.date(record[item.parent_id].time, 'yyyy-MM-dd HH:mm:ss');
      var _base_value = record[item.parent_id].value;
      for (var i = 0; i < partner_limit; i++) {
        _record["value" + i] = formatReadableFloat(_base_value * 0.17 * (5 * partner_limit - (i + 1) * 0.42 - ((_base_value * 1000).toFixed(0) % (10 + i))) / (5 * partner_limit) );
      }
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
  partner_profile = extractMockupTopPartnersProfile(partner_limit);

  partner_data = $.extend(true, [], gauge_data);
  $.each(partner_data, function (index, label_data) {
    label_data.name = "Top Partners - " + label_data.name; 
    label_data.parent_id = label_data.id;
    label_data.id += "-part";
  });
}

function extractMockupTopPartnersProfile (_limit) {
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
    _item.rand = [Math.random(), Math.random(), Math.random()];
    _set[item.id] = _item;
  });
  _data_list.push(_set);
}
