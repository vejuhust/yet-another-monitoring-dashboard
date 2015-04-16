
function fetchGauageRowData () {
  updateGauageProgress(100);

  $.each(gauge_data, function (index, item) {
    item['time'] = new Date();
    item['value'] *= 1 + (Math.random() - 0.5) * 0.1;
  });

  var _div = $("#gauge-count");
  var _count = parseInt(_div.text()) + 1;
  _div.text(_count);

  var _font_size = animationFontZoomIn(".small-box .icon", 1.1);
  renderGaugeRowItems();
  animationFontZoomOut(".small-box .icon", _font_size);
  console.log(_font_size);

  updateGauageProgress(0);
}
