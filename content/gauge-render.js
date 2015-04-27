
function renderOrUpdateGaugeRowItemsWithAnimation (row_data) {
  var _icon_selector = ".small-box .icon";
  var _font_size = animationFontZoomIn(_icon_selector, 1.1);
  setTimeout(function () {
    renderOrUpdateGaugeRowItems(row_data);
  }, 250);
  _font_size = 90;
  animationFontZoomOut(_icon_selector, _font_size, 400);
}

function renderOrUpdateGaugeRowItems (row_data) {
  if ($("#gauge-row").children().length) {
    updateExistingGaugeRowItems(row_data);
  }
  else {
    renderNewGaugeRowItems(row_data);
  }
}

function updateExistingGaugeRowItems (row_data) {
  $("#gauge-row").show();
  $("#gauge-row").children().each(function (index, div) {
    $(div).find("h3").contents().first()[0].textContent = formatReadableFloat(row_data[index].value);
    $(div).find(".small-box-footer").contents().first()[0].textContent = _formatTimestampForGauge(row_data[index].time);
  });
}

function renderNewGaugeRowItems (row_data) {
  var guage_row = $('<div/>', { class: "row", id: "gauge-row"});
  $.each(row_data, function (index, item) {
    guage_row.append(createGaugeBox(item));
  });
  $("#gauge-row").replaceWith(guage_row);
}

function createGaugeBox (item_data) {
  var _div = $("<div/>", { class: "col-lg-3 col-xs-6"});
  var _div_color = $("<div/>", { class: "small-box " + item_data.color + "-gradient" });
  var _div_text = $("<div/>", { class: "inner"});

  var _div_value = $("<h3/>", { style: "font-size: 64px;", text: formatReadableFloat(item_data.value) });
  if (item_data.unit) {
    $("<sup/>", { style: "font-size: 32px", text: item_data.unit }).appendTo(_div_value);
  }
  _div_value.appendTo(_div_text);
  $("<p/>", { text: item_data.name }).appendTo(_div_text);
  _div_text.appendTo(_div_color);

  var _div_icon = $("<div/>", { class: "icon"}).append($("<i/>", { class: item_data.icon}));
  _div_icon.appendTo(_div_color);

  var _div_time = $("<div/>", { class: "small-box-footer", text: _formatTimestampForGauge(item_data.time) });
  _div_time.append($("<i/>", { class: "fa fa-fw fa-clock-o"}));
  _div_time.appendTo(_div_color);

  _div_color.appendTo(_div);

  return _div;
}

function _formatTimestampForGauge (timestamp) {
  return $.format.date(timestamp, 'HH:mm:ss') + " ";
}
