
var _selector_chart_box_all = "section div[name=chart-box]";

function renderCharts () {
  renderChartBoxes();
  renderChartContents();
}

function renderChartBoxes () {
  removeChartBoxes();

  initializePartnersForCharts();
  var source_list = [gauge_data, partner_data];

  $.each(source_list, function (source_index, source) {
    $.each(source, function (index, label_data) {
      var _id_col = index % 2 == 0 ? "#chart-col-left" : "#chart-col-right";
      $(_id_col).append(createChartBox(label_data, source_index));
    });
  });
}

function renderChartContents () {
  _chart_set = {};
  _chart_main_set = {};
  _chart_partner_set = {};

  var _suffix = $("#content-title-desc").text();
  $.each(gauge_data, function (index, label_data) {
    createChartContent(label_data.id + "-chart", label_data, _suffix);
  });

  _suffix = _page_profile.env_region_name;
  $.each(partner_data, function (index, label_data) {
    createPartnerChartContent(label_data.id + "-chart", label_data, _suffix);
  });
}

function createChartContent (_div_id, _label, _suffix) {
  var _setting = $.extend(true, {}, _chart_setting);
  _setting.titles[0].id = _label.id + "-title";
  _setting.titles[0].text = _label.name + " - " + _suffix;
  _setting.valueAxes[0].title = _label.unit || "Rate";
  _setting.legend.valueText = _setting.graphs[0].balloonText;
  _setting.legend.valueWidth = 100;
  _setting.dataProvider = [];

  switch (_page_profile.page_type) {
    case "environment":
      _setting.graphs[0].title = _page_profile.env_name;
      _setting.graphs[0].valueField = "value";
      _setting.graphs[0].balloonText = "[[value]] " + (_label.unit || "");
      break;
    case "region":
      _setting.graphs = [];
      _setting.graphs.push(generateChartGraphs(
        _chart_setting.graphs[0], 
        "sum", 
        _page_profile.region_name, 
        "sum", 
        _label.unit, 
        menu_env_data[_page_profile.region_index].color));
      for (var index = 0; index < _page_profile.env_count; index++) {
        _setting.graphs.push(generateChartGraphs(
          _chart_setting.graphs[0], 
          index, 
          menu_env_data[_page_profile.region_index].sub[index + 1].name, 
          "value" + index, 
          _label.unit, 
          shadeColorCode(menu_env_data[_page_profile.region_index].color, (index + 1) * 40 / (_page_profile.env_count))));
      };
      _setting.legend.length = 0;
      break;
    case "global":
      _setting.graphs = [];
      _setting.graphs.push(generateChartGraphs(_chart_setting.graphs[0], "sum", _page_profile.region_name, "sum", _label.unit, menu_env_data[0].color));
      for (var index = 0; index < _page_profile.region_count; index++) {
        _setting.graphs.push(generateChartGraphs(_chart_setting.graphs[0], index, menu_env_data[index + 1].name, "value" + index, _label.unit, menu_env_data[index + 1].color));
      };
      _setting.legend.length = 0;
      break;
  }

  $("#" + _div_id).replaceWith($("<div/>", { class: "chart", style: "height:400px;", id: _div_id }));
  _chart_set[_label.id] = AmCharts.makeChart(_div_id, _setting);
  _chart_set[_label.id].addListener("zoomed", syncZoom);
  if (!_setting.legend.length) {
    _chart_set[_label.id].addLegend(generateChartLegend(65, syncDisplayOfMainGraphsLine), _label.id);
  }

  _chart_main_set[_label.id] = _chart_set[_label.id];
}

function createPartnerChartContent (_div_id, _label, _suffix) {
  var _setting = $.extend(true, {}, _chart_setting);
  _setting.titles[0].id = _label.id + "-title";
  _setting.titles[0].text = _label.name + " - " + _suffix;
  _setting.valueAxes[0].title = _label.unit || "Rate";
  _setting.dataProvider = [];
  _setting.legend.length = 0;
  
  _setting.graphs = [];
  $.each(partner_profile, function (index, profile) {
    _setting.graphs.push(generateChartGraphs(_chart_setting.graphs[0], index, profile.name, "value" + index, _label.unit, undefined));
  });

  $("#" + _div_id).replaceWith($("<div/>", { class: "chart", style: "height:400px;", id: _div_id }));
  _chart_set[_label.id] = AmCharts.makeChart(_div_id, _setting);
  _chart_set[_label.id].addLegend(generateChartLegend(65, syncDisplayOfPartnerGraphsLine), _label.id);
  _chart_set[_label.id].addListener("zoomed", syncZoom);

  _chart_partner_set[_label.id] = _chart_set[_label.id];
}

function generateChartGraphs (_graphs_setting, index, name, value, unit, color) {
  var _graphs = $.extend(true, {}, _graphs_setting);
  _graphs.id = "zen" + index;
  _graphs.title = name;
  _graphs.valueField = value;
  _graphs.balloonText = name + ": [[" + value +  "]] " + (unit || "");
  _graphs.bullet = "none";
  _graphs.bulletBorderColor = color;
  _graphs.bulletColor = color;
  _graphs.lineColor = color;
  return _graphs;
}

function generateChartLegend (_width, _handler) {
  var _legend = new AmCharts.AmLegend();
  _legend.useGraphSettings = true;
  _legend.valueText = "[[value]]";
  _legend.valueWidth = _width;
  _legend.addListener("hideItem", _handler);
  _legend.addListener("showItem", _handler);
  return _legend;
}

function syncDisplayOfMainGraphsLine (event) {
  syncDisplayOfGraphsLine(event, _chart_main_set);
}

function syncDisplayOfPartnerGraphsLine (event) {
  syncDisplayOfGraphsLine(event, _chart_partner_set);
}

function syncDisplayOfGraphsLine (event, _set) {
  var _index = event.dataItem.index;
  var _hidden = event.type == "hideItem";
  var _start = event.chart.startIndex;
  var _end = event.chart.endIndex;
  var _zoomed = event.chart.dataProvider.length != (_end - _start + 1);
  var _last_chart = undefined;

  $.each(_set, function (index, _chart_id) {
    _chart_id.graphs[_index].hidden = _hidden;
    _chart_id.validateData();
    _last_chart = _chart_id;
  });

  if (_zoomed) {
    _last_chart.zoomToIndexes(_start, _end);
  }
}

function syncZoom(event) {
  zoomAllChartContent(event.startIndex, event.endIndex);
}

function zoomAllChartContent(_start, _end) {
  $.each(_chart_set, function (index, _chart_id) {
    _chart_id.zoomToIndexes(_start, _end);
  });
}

function updateCharts (_data_set) {
  $.each(gauge_data.concat(partner_data), function (index, label_data) {
    updateChartContentWithData(label_data.id, _data_set[label_data.id]);
  });
}

function updateChartContentWithData (_id, _data) {
  var _start = _chart_set[_id].startIndex;
  var _end = _chart_set[_id].endIndex;
  var _length = _chart_set[_id].dataProvider.length;
  if (!(_start && _end) || (_length == _end - _start + 1)) {
    var _archive_data = _chart_set[_id].dataProvider;
    _chart_set[_id].dataProvider = _data;
    _chart_set[_id].validateData();
    _archive_data.length = 0;
  }
}

function showChartBoxes () {
  $(_selector_chart_box_all).show();
}

function hideChartBoxes () {
  $(_selector_chart_box_all).hide();
}

function removeChartBoxes () {
  $.each(_chart_set, function (index, _chart_id) {
    _chart_id.clear();
  });
  _chart_set.length = 0;
  $(_selector_chart_box_all).remove();
}

function createChartBox (_data, _striped_header) {
  var _div = $("<div/>", { class: "box box-solid", id: _data.id + "-box", name: "chart-box" });

  var _header = $("<div/>", { class: "box-header", style: "border-radius: 3px 3px 0 0 / 3px 3px;" });
  if (_striped_header) {
    _header.addClass(_data.color);
    _header.addClass("chart-box-header-striped");
    _header.addClass("chart-box-header-active");
  }
  else {
    _header.addClass(_data.color + "-gradient");
  }

  _header.append($("<i/>", { class: _data.icon }));
  _header.append($("<h3/>", { class: "box-title", text: _data.name + " Graph" }));

  var _body = $("<div/>", { class: "box-body border-radius-none" });
  _body.append($("<div/>", { class: "chart", style: "height:400px;", id: _data.id + "-chart" }));

  _div.append(_header);
  _div.append(_body);

  return _div;
}

var _chart_set = {};
var _chart_main_set = {};
var _chart_partner_set = {};

var _chart_font_size = 14;
var _chart_bullet_color = "#000000";

var _chart_setting =
{
  "type": "serial",
  "addClassNames": true,
  "classNamePrefix": "amcharts",
  "pathToImages": "amcharts/images/",
  "categoryField": "date",
  "dataDateFormat": "YYYY-MM-DD HH:NN:SS",
  "fontSize": _chart_font_size,
  "fontFamily": "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
  "theme": "light",
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
      "bulletBorderColor": _chart_bullet_color,
      "bulletBorderThickness": 1,
      "bulletColor": _chart_bullet_color,
      "bulletSize": 1,
      "classNameField": "bulletClass",
      "id": "g2",
      "lineColor": _chart_bullet_color,
      "lineThickness": 1,
      "showBalloon": true,
      "title": undefined,
      "type": "line",
      "valueField": undefined,
    },
  ],
  "guides": [],
  "valueAxes": [
    {
      "id": "ValueAxis",
      "title": undefined,
      "fontSize": _chart_font_size,
      "minimum": 0,
    }
  ],
  "allLabels": [],
  "balloon": {},
  "legend": {
    "useGraphSettings": true,
    "valueWidth": undefined,
    "valueText": undefined,
  },
  "titles": [
    {
      "id": undefined,
      "size": _chart_font_size + 3,
      "text": undefined,
    }
  ],
  "dataProvider": undefined,
};
