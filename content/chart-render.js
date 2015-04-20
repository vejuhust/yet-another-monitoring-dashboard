function renderChartBoxes () {
  $.each(gauge_data, function (index, label_data) {
    if ($("#" + label_data.id + "-box").length == 0) {
      $("#chart-col-left").append(createChartBox(label_data));
    }
  });
}

function updateChartBoxes () {
  console.log("updateChartBoxes");
}

function createChartBox (_data) {
  var _div = $("<div/>", { class: "box box-solid " + _data.color + "-gradient", id: _data.id + "-box" });
  
  var _header = $("<div/>", { class: "box-header" });
  _header.append($("<i/>", { class: _data.icon }));
  _header.append($("<h3/>", { class: "box-title", text: _data.name + " Graph" }));

  var _button = $("<div/>", { class: "box-tools pull-right" });
  _button.append($('<button class="btn ' + _data.color + ' btn-sm" data-widget="collapse"><i class="fa fa-minus"></i></button>'));
  _button.append($('<button class="btn ' + _data.color + ' btn-sm" data-widget="remove"><i class="fa fa-times"></i></button>'));
  _button.appendTo(_header);

  var _body = $("<div/>", { class: "box-body border-radius-none" });
  _body.append($("<div/>", { class: "chart", style: "height: 250px;", id: _data.id + "-chart" }));

  _div.append(_header);
  _div.append(_body);

  return _div;
}
