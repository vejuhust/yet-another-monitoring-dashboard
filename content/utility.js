
function animationFontZoomIn(_selector, _rate) {
  var _div = $(_selector);
  if (_div.length) {
    var _current = parseInt(_div.css("font-size"));
    var _new = (_current * _rate).toFixed(0);
    _div.css("font-size", _new + "px");
    return _current;
  }
}

function animationFontZoomOut(_selector, _archive) {
  var _div = $(_selector);
  if (_div.length && _archive != undefined) {
    setTimeout(function() {
      _div.css("font-size", _archive + "px");
    }, 400);
  }
}

function extractEnvPartProfile () {
  var tag = extractHashTags();
  var info_env = searchConfigByTagEnv(tag.env);
  var info_part = searchConfigByTagPart(tag.part);
  return $.extend(info_env, info_part);
}

function searchConfigByTagEnv(tag_env) {
  var _region_name, _region_icon, _region_link, _env_name, _env_link;

  for (var rl = menu_env_data.length, ri = 0; ri < rl; ri++) {
    var region = menu_env_data[ri];
    if (region.sub) {
      for (var el = region.sub.length, ei = 0; ei < el; ei++) {
        var env = region.sub[ei];
        if (env.link == tag_env) {
          _region_name = region.name;
          _region_icon = region.icon;
          _env_name = env.name;
          _env_link = env.link;
          break;
        }
      }
    }
    else {
      if (region.link == tag_env) {
        _region_name = region.name;
        _region_icon = region.icon;
        _region_link = region.link;
        break;
      }
    }
  }

  return {
    "region_name": _region_name,
    "region_icon": _region_icon,
    "region_link": _region_link,
    "env_name": _env_name,
    "env_link": _env_link,
  };
}

function searchConfigByTagPart (tag_part) {
  var _part_name, _part_icon, _part_link;

  for (var pl = menu_part_data.length, pi = 0; pi < pl; pi++) {
    var partner = menu_part_data[pi];
    if (partner.link == tag_part) {
      _part_name = partner.name;
      _part_icon = partner.icon;
      _part_link = partner.link;
      break;
    }
  }

  return {
    "part_name": _part_name,
    "part_icon": _part_icon,
    "part_link": _part_link,
  };
}
