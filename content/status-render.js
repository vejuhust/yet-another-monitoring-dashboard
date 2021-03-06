
function updateSearchBoxStatusLine (_selected_env, _selected_part) {
    var _div = $("<p/>", { id: _id_searchbox_status, class: "text-aqua" });
    if (!_selected_env && !_selected_part) {
      _div.append("You choose no environment nor partner.");
    }
    else if (!_selected_env) {
      _div.append("You should choose a environment to continue.");
    }
    else if (!_selected_part) {
      _div.append("You choose <strong>" + _selected_env + "</strong> as environment. What about partner?");
    }
    else {
      _div.append("You choose <strong>" + _selected_env + "</strong> as environment with <strong>" + _selected_part + "</strong> as partner.");
    }
    $("#" + _id_searchbox_status).replaceWith(_div);
}

function updateFetchCounter () {
  var _count = _data_list.length;
  $("#fetch-count").text(_count);
  $("#fetch-count-text").text(_count);

  var _set = _data_list.slice(-1)[0];
  var _keys = Object.keys(_set);
  var _time = _set[_keys[0]].time;
  if (_time) {
    var _doc = $("<a/>");
    _doc.append($("<i/>", { class: "fa fa-table text-aqua" }));
    _doc.append("Latest data: " + formatDateTime(_time));
    $("#fetch-count-content").prepend($("<li/>").append(_doc));
  }
}

function updateBookmarkCounter () {
  if (_page_profile.page_type != "default") {
    var _count = parseInt($("#bookmark-count").text()) + 1;

    // Extract current view and link
    var _name = $("#content-title-desc").text();
    var _link = window.location.hash;

    // Remove duplicate records
    $("#bookmark-count-content a[href=" + _link + "]").remove();

    // Create DOM for view history record 
    var _doc = $("<a/>", { href: _link });
    _doc.append($("<i/>", { class: "fa fa-table text-aqua" }));
    _doc.append("<strong>" + _name + "</strong>");
    $("#bookmark-count-content").prepend($("<li/>").append(_doc));

    // Update the counter
    $("#bookmark-count").text(_count);
    $("#bookmark-count-text").text($("#bookmark-count-content a[href]").length);
  }
}

function updateFetchProgress (num) {
  var rate;
  if (num != undefined) {
    rate = num / 100;
    _intervalPast = interval_fetch * rate;
  }
  else {
    _intervalPast += interval_progress;
    rate = _intervalPast / interval_update;
  }
  updateProgressBar(rate);
}

function updateProgressBar (rate) {
  var _rate = rate * 100;
  _rate = _rate > 100 ? 100 : _rate;
  var percent = _rate.toFixed(0);
  $("#progbar-text").text(percent + "%");
  $("#progbar-rate").attr("style", "width: " + percent + "%");
}
