
function fetchDataAndUpdateContent () {
  updateGauageProgress(100);

  fetchGauageRowData();

  updateGaugeCounter();

  renderGaugeRowItemsWithAnimation();

  updateGauageProgress(0);
}

function fetchGauageRowData () {
  $.each(gauge_data, function (index, item) {
    item['time'] = new Date();
    item['value'] *= 1 + (Math.random() - 0.5) * 0.1;
  });
}