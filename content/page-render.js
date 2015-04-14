console.log("hello page");

function renderMainPage(tag_env, tag_part) {
  console.log("now " + tag_env + " " + tag_part);

  var info = searchStaticDataByTagEnv(tag_env);
  console.log(info);
  updateContentTitleDesc(info);
};

function updateContentTitleDesc (info) {
  var desc = $("<small/>", { id: "content-title-desc" });
  if (info.region_icon || info.region_name) {
    $("<i/>", {"class": info.region_icon}).appendTo(desc);
    desc.append(" " + info.region_name + " ");
  }
  if (info.env_name) {
    $("<i/>", {"class": info.env_name}).appendTo(desc);
    desc.append(" - " + info.env_name + " ");
  }
  $("#content-title-desc").replaceWith(desc);
}

function searchStaticDataByTagEnv(tag_env) {
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
      };
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

  return result = {
    "region_name": _region_name,
    "region_icon": _region_icon,
    "region_link": _region_link,
    "env_name": _env_name,
    "env_link": _env_link,
  };
}
