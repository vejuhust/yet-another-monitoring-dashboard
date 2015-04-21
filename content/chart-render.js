
var _selector_chart_box_all = "section div[name=chart-box]";

function renderCharts () {
  renderChartBoxes();
  renderChartContents();
}

function renderChartBoxes () {
  console.log("renderChartBoxes ~~~~~~~");
  removeChartBoxes();
  $.each(gauge_data, function (index, label_data) {
    var _id_col = index % 2 == 0 ? "#chart-col-left" : "#chart-col-right";
    $(_id_col).append(createChartBox(label_data));
  });
}

function renderChartContents () {
  $.each(gauge_data, function (index, label_data) {
    createChartContent(label_data.id + "-chart", label_data);
  });
}

function createChartContent (_div_id, _label) {
  var _setting = $.extend(true, {}, _chart_setting);
  _setting.graphs[0].title = _label.name;
  _setting.graphs[0].balloonText = "[[value]] " + (_label.unit || "");
  _setting.titles[0].id = _label.id + "-title";
  _setting.titles[0].text = _label.name + " -" + $("#content-title-desc").text();
  _setting.valueAxes[0].title = _label.unit || "Rate";
  _setting.dataProvider = [];

  $("#" + _div_id).replaceWith($("<div/>", { class: "chart", style: "height:400px;", id: _div_id }));
  _chart_set[_label.id] = AmCharts.makeChart(_div_id, _setting);

  console.log("chart " + _label.id + " created ~ !");
}

function updateCharts (_data_set) {
  updateChartContents(_data_set);
}

function updateChartContents (_data_set) {
  $.each(gauge_data, function (index, label_data) {
    updateChartContentWithData(label_data.id, _data_set[label_data.id]);
  });
}

function updateChartContentWithData (_id, _data) {
  _data[_data.length - 1].bulletClass = "lastBullet";
  var _archive_data = _chart_set[_id].dataProvider;
  _chart_set[_id].dataProvider = _data;
  _chart_set[_id].validateData();
  _archive_data.length = 0;
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
  _body.append($("<div/>", { class: "chart", style: "height:400px;", id: _data.id + "-chart" }));

  _div.append(_header);
  _div.append(_body);

  return _div;
}

var _chart_set = {};

var _chart_setting = 
{
  "type": "serial",
  "addClassNames": true,
  "classNamePrefix": "amcharts",
  "pathToImages": "amcharts/images/",
  "categoryField": "date",
  "dataDateFormat": "YYYY-MM-DD HH:NN:SS",
  "fontFamily": "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
  "theme": "black",
  "categoryAxis": {
    "minPeriod": "ss",
    "parseDates": true
  },
  "chartCursor": {
    "categoryBalloonDateFormat": "JJ:NN:SS"
  },
  "trendLines": [],
  "graphs": [
    {
      "animationPlayed": true,
      "balloonText": undefined,
      "bullet": "round",
      "bulletBorderAlpha": 1,
      "bulletBorderColor": "#DDE0E0",
      "bulletBorderThickness": 1,
      "bulletColor": "#FFFFFF",
      "bulletSize": 1,
      "classNameField": "bulletClass",
      "id": "g2",
      "lineColor": "#FFFFFF",
      "lineThickness": 1,
      "showBalloon": true,
      "title": undefined,
      "type": "line",
      "valueField": "value",
    },
  ],
  "guides": [],
  "valueAxes": [
    {
      "id": "ValueAxis",
      "title": undefined,
      "minimum": 0,
    }
  ],
  "allLabels": [],
  "balloon": {},
  "legend": {
    "useGraphSettings": true
  },
  "titles": [
    {
      "id": undefined,
      "size": 15,
      "text": undefined,
    }
  ],
  "dataProvider": undefined,
};
