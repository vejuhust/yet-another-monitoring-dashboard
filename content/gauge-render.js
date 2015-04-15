
function renderGaugeRowItems () {
  updateDataForGauageItems();
  if ($("#gauge-row").children().length) {
    renderGaugeRowItemsWithUpdates();
  }
  else {
    renderGaugeRowItemsFromScratch();
  }
}

function updateDataForGauageItems () {
  $.each(gauge_data, function (index, item) {
    item['time'] = new Date();
    item['value'] *= 1 + (Math.random() - 0.5) * 0.1;
  });
}

function renderGaugeRowItemsWithUpdates () {
  $("#gauge-row").children().each(function (index, div) {
    $(div).find("h3").contents().first()[0].textContent = _formatValueForGauge(gauge_data[index].value);
    $(div).find(".small-box-footer").contents().first()[0].textContent = _formatTimestampForGauge(gauge_data[index].time);
  });
}

function renderGaugeRowItemsFromScratch () {
  var guage_row = $('<div/>', { class: "row", id: "gauge-row"});
  $.each(gauge_data, function (index, item) {
    guage_row.append(createGaugeBox(item));
  });
  $("#gauge-row").replaceWith(guage_row);
}

function createGaugeBox (item_data) {
  var _div = $("<div/>", { class: "col-lg-2 col-xs-6"});
  var _div_color = $("<div/>", { class: "small-box " + item_data.color });
  var _div_text = $("<div/>", { class: "inner"});

  var _div_value = $("<h3/>", { text: _formatValueForGauge(item_data.value) });
  if (item_data.unit) {
    $("<sup/>", { style: "font-size: 20px", text: item_data.unit }).appendTo(_div_value);
  }
  _div_value.appendTo(_div_text);
  $("<p/>", { text: item_data.name }).appendTo(_div_text);
  _div_text.appendTo(_div_color);

  var _div_icon = $("<div/>", { class: "icon"}).append($("<i/>", { class: item_data.icon}));
  _div_icon.appendTo(_div_color);

  var _div_time = $("<div/>", { class: "small-box-footer", href: "#", text: _formatTimestampForGauge(item_data.time) });
  _div_time.append($("<i/>", { class: "fa fa-arrow-circle-right"}));
  _div_time.appendTo(_div_color);

  _div_color.appendTo(_div);

  return _div;
}

function _formatValueForGauge (value) {
  return value.toFixed(3);
}

function _formatTimestampForGauge (timestamp) {
  return "Updated at " + $.format.date(timestamp, 'HH:mm:ss.SSS') + " ";  
}
