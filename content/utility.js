
function shadeRGBColor(color, percent) {
    var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
    return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
}

function shadeColorCode(color, percent) {  
    var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

function animationFontZoomIn(_selector, _rate) {
  var _div = $(_selector);
  if (_div.length) {
    var _current = parseInt(_div.css("font-size"));
    var _new = (_current * _rate).toFixed(0);
    _div.css("font-size", _new + "px");
    return _current;
  }
}

function animationFontZoomOut(_selector, _archive, _delay) {
  var _div = $(_selector);
  if (_div.length && _archive != undefined) {
    setTimeout(function() {
      _div.css("font-size", _archive + "px");
    }, _delay);
  }
}


function formatTimestamp (timestamp) {
  return $.format.date(timestamp, 'HH:mm:ss') + " ";
}

function formatDateTime (timestamp) {
  return $.format.date(timestamp, 'HH:mm:ss MMM d');
}

function formatReadableFloat (value) {
  var precision;
  if (value < 10) {
    precision = 3;
  }
  else if (value < 100) {
    precision = 2;
  }
  else if (value < 1000) {
    precision = 2;
  }
  else if (value < 10000) {
    precision = 1;
  }
  else {
    precision = 0;
  }
  return value.toFixed(precision);
}

function flattenConfigIntoList (config_data) {
  var _child_list = [];
  for (var pl = config_data.length, pi = 0; pi < pl; pi++) {
    var parent = config_data[pi];
    for (var cl = parent.sub.length, ci = 0; ci < cl; ci++) {
      var child = parent.sub[ci];
      _child_list.push({
        "name": child.name,
        "link": child.link,
        "icon": parent.icon,
      });
    }
  }
  return _child_list;
}

function updatePageProfile () {
  var tag = extractHashTags();
  var info_env = searchConfigByTagEnv(tag.env);
  var info_part = searchConfigByTagPart(tag.part);
  _page_profile = $.extend(info_env, info_part);
  _page_profile["env_region_name"] = _page_profile.env_name || _page_profile.region_name;
  _page_profile["env_region_link"] = _page_profile.env_link || _page_profile.region_link;

  var _type = "default";
  if (_page_profile.env_region_name) {
    if (_page_profile.env_name) {
      _type = _page_profile.is_summary ? "region" : "environment";
    }
    else {
      _type = "global";
    }
  }
  _page_profile["page_type"] = _type;
}

function searchConfigByTagEnv(tag_env) {
  var result = searchTwoLevelConfigByTagLink(menu_env_data, tag_env);
  return {
    "region_name": result.parent_name,
    "region_icon": result.parent_icon,
    "region_link": result.parent_link,
    "env_name": result.child_name,
    "env_link": result.child_link,
    "is_summary": result.child_index == 0,
    "env_count": result.child_count - 1,
    "region_count": result.parent_count - 1,
    "region_index": result.parent_index,
  };
}

function searchConfigByTagPart (tag_part) {
  var result = searchTwoLevelConfigByTagLink(menu_part_data, tag_part);
  return {
    "partgrp_name": result.parent_name,
    "partgrp_link": result.parent_link,
    "part_icon": result.parent_icon,
    "part_name": result.child_name,
    "part_link": result.child_link,
    "part_count": result.child_count,
  };
}

function searchTwoLevelConfigByTagLink(config_data, tag_link) {
  var _parent_name, _parent_icon, _parent_link, _parent_index, _parent_count, _child_name, _child_link, _child_index, _child_count;

  for (var pl = config_data.length, pi = 0; pi < pl; pi++) {
    var parent = config_data[pi];
    if (parent.sub) {
      for (var cl = parent.sub.length, ci = 0; ci < cl; ci++) {
        var child = parent.sub[ci];
        if (child.link == tag_link) {
          _parent_name = parent.name;
          _parent_icon = parent.icon;
          _child_name = child.name;
          _child_link = child.link;
          _child_index = ci;
          _child_count = cl;
          _parent_index = pi; 
          _parent_count = pl; 
          break;
        }
      }
    }
    else {
      if (parent.link == tag_link) {
        _parent_name = parent.name;
        _parent_icon = parent.icon;
        _parent_link = parent.link;
        _parent_count = pl; 
        break;
      }
    }
  }

  return {
    "parent_name": _parent_name,
    "parent_link": _parent_link,
    "parent_index": _parent_index,
    "parent_icon": _parent_icon,
    "parent_count": _parent_count,
    "child_name": _child_name,
    "child_link": _child_link,
    "child_index": _child_index,
    "child_count": _child_count,
  };
}
