
var _data_list = [];

function fetchDataAndRenderContent () {
  console.log("fetchDataAndRenderContent first time!");
  _data_list = [];
  extractDataAndUpdateContent();
}

function extractDataAndUpdateContent () {
  updateFetchProgress(100);

  extractGauageRowData();
  renderGaugeRowItemsWithAnimation();

  updateFetchCounter();
  updateFetchProgress(0);
}

function extractGauageRowData () {
  if (!_data_list.length) {
    fetchMockupData();
  }
  return _data_list.slice(-1)[0];
}

function fetchMockupData () {
  $.each(gauge_data, function (index, item) {
    item['time'] = new Date();
    item['value'] *= 1 + (Math.random() - 0.5) * 0.1;
  });
  _data_list.push(gauge_data);
}
