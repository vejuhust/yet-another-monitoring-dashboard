
var _data_list = [];

function fetchDataAndRenderContent () {
  console.log("fetchDataAndRenderContent first time!");
  _data_list = [];
  extractDataAndUpdateContent();
}

function extractDataAndUpdateContent () {
  updateFetchProgress(100);

  renderGaugeRowItemsWithAnimation(extractGauageRowData());

  updateFetchCounter();
  updateFetchProgress(0);
}

function extractGauageRowData () {
  if (!_data_list.length) {
    fetchMockupData();
  }
  var _list = _data_list.slice(-1)[0];
  var _data = $.extend(true, {}, gauge_data);
  $.each(_data, function (index, item) {
    item.time = _list[index].time;
    item.value = _list[index].value;
  });
  return _data;
}

function fetchMockupData () {
  var _list = [];
  $.each(gauge_data, function (index, item) {
    var _item = {};
    _item.time = new Date();
    _item.value = item.value * (1 + (Math.random() - 0.5) * 0.1);
    _list.push(_item);
  });
  _data_list.push(_list);
}
