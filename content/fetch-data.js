
function fetchDataAndRenderContent () {
  console.log("fetchDataAndRenderContent first time!");
  fetchDataAndUpdateContent();
}

function fetchDataAndUpdateContent () {
  updateFetchProgress(100);

  fetchMockupData();
  renderGaugeRowItemsWithAnimation();

  updateFetchCounter();
  updateFetchProgress(0);
}

function fetchMockupData () {
  $.each(gauge_data, function (index, item) {
    item['time'] = new Date();
    item['value'] *= 1 + (Math.random() - 0.5) * 0.1;
  });
}
