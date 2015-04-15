
function fetchGauageRowData () {
  $.each(gauge_data, function (index, item) {
    item['time'] = new Date();
    item['value'] *= 1 + (Math.random() - 0.5) * 0.1;
  });

  var _div = $("#gauge-count");
  var _count = parseInt(_div.text()) + 1;
  _div.text(_count);
}
