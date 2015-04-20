
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
  _setting.graphs[0].id = _label.id + "-graph";
  _setting.graphs[0].title = _label.name;
  _setting.titles[0].id = _label.id + "-title";
  _setting.titles[0].text = _label.name + " -" + $("#content-title-desc").text();
  _setting.valueAxes[0].title = _label.unit || "Count";

  AmCharts.makeChart(_div_id, _setting);
}

function updateCharts () {
  console.log("updateCharts");
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

var _chart_setting = 
{
  "type": "serial",
  "pathToImages": "amcharts/images/",
  "categoryField": "date",
  "dataDateFormat": "YYYY-MM-DD HH:NN",
  "categoryAxis": {
    "minPeriod": "mm",
    "parseDates": true
  },
  "chartCursor": {
    "categoryBalloonDateFormat": "JJ:NN"
  },
  "chartScrollbar": {},
  "trendLines": [],
  "graphs": [
    {
      "bullet": "round",
      "id": "",
      "title": "",
      "valueField": "value"
    }
  ],
  "guides": [],
  "valueAxes": [
    {
      "id": "ValueAxis",
      "title": "",
    }
  ],
  "allLabels": [],
  "balloon": {},
  "legend": {
    "useGraphSettings": true
  },
  "titles": [
    {
      "id": "",
      "size": 15,
      "text": "",
    }
  ],
  "dataProvider": [
    {
      "value": 80,
      "date": "2014-03-01 07:57"
    },
    {
      "value": 65,
      "date": "2014-03-01 07:58"
    },
    {
      "value": 23,
      "date": "2014-03-01 07:59"
    },
    {
      "value": 19,
      "date": "2014-03-01 08:00"
    },
    {
      "value": 28,
      "date": "2014-03-01 08:01"
    },
    {
      "value": 38,
      "date": "2014-03-01 08:02"
    },
    {
      "value": 66,
      "date": "2014-03-01 08:03"
    }
  ]
};
