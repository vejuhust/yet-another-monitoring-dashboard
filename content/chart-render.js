
var _selector_chart_box_all = "section div[name=chart-box]";

function renderChartBoxes () {
  console.log("renderChartBoxes ~~~~~~~");
  removeChartBoxes();
  $.each(gauge_data, function (index, label_data) {
    var _id_col = index % 2 == 0 ? "#chart-col-left" : "#chart-col-right";
    $(_id_col).append(createChartBox(label_data));
  });
  $.AdminLTE.boxWidget.activate();
}

function updateChartBoxes () {
  console.log("updateChartBoxes");
}

function showChartBoxes () {
  $(_selector_chart_box_all).show();
}

function hideChartBoxes () {
  $(_selector_chart_box_all).hide();
}

function removeChartBoxes () {
  $(_selector_chart_box_all).remove();
}

function createChartBox (_data) {
  var _div = $("<div/>", { class: "box box-solid " + _data.color + "-gradient", id: _data.id + "-box", name: "chart-box" });
  
  var _header = $("<div/>", { class: "box-header" });
  _header.append($("<i/>", { class: _data.icon }));
  _header.append($("<h3/>", { class: "box-title", text: _data.name + " Graph" }));

  var _button = $("<div/>", { class: "box-tools pull-right" });
  _button.append($('<button class="btn ' + _data.color + ' btn-sm" data-widget="collapse" style="margin-right:3px;"><i class="fa fa-minus"></i></button>'));
  _button.append($('<button class="btn ' + _data.color + ' btn-sm" data-widget="remove"><i class="fa fa-times"></i></button>'));
  _button.appendTo(_header);

  var _body = $("<div/>", { class: "box-body border-radius-none" });
  _body.append($("<div/>", { class: "chart", style: "height: 300px;", id: _data.id + "-chart" }));

  _div.append(_header);
  _div.append(_body);

  return _div;
}
