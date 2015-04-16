
function fetchGauageRowData () {
  updateGauageProgress(100);

  $.each(gauge_data, function (index, item) {
    item['time'] = new Date();
    item['value'] *= 1 + (Math.random() - 0.5) * 0.1;
  });

  updateGaugeCounter();

  renderGaugeRowItemsWithAnimation();

  updateGauageProgress(0);
}
