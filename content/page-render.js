var _profile;

function renderMainPage(tag_env, tag_part) {
  _profile = extractEnvPartProfile(tag_env, tag_part);
  if (updateContentTitleDesc(_profile)) {
    updateWebpageTitle(_profile);
    addNewSubBoxInStatusBox(_profile);
  }
}

function updateContentTitleDesc (profile) {
  var desc = $("<small/>", { id: "content-title-desc" });
  if (profile.region_icon || profile.region_name) {
    $("<i/>", {"class": profile.region_icon}).appendTo(desc);
  }
  if (profile.env_name) {
    desc.append(" " + profile.env_name);
  }
  else if (profile.region_name) {
    desc.append(" " + profile.region_name);
  }
  if (profile.part_name) {
    desc.append(" - ");
    $("<i/>", {"class": profile.part_icon}).appendTo(desc);
    desc.append(" " + profile.part_name);
  }
  $("#content-title-desc").replaceWith(desc);
  return $("#content-title-desc").html().length > 0;
}

function updateWebpageTitle (profile) {
  var _title = "EGMD | ";
  if (profile.env_name) {
    _title += profile.env_name;
  } else if (profile.region_name) {
    _title += profile.region_name;
  }
  if (profile.part_name) {
    _title += " - " + profile.part_name;
  }
  document.title = _title;
}

function restartStatusBoxIfHidden () {
  if ($("#status-box:hidden").length) {
    $("#status-subbox").empty();
    $("#status-box").show();
  }
}

function addNewSubBoxInStatusBox (profile) {
  restartStatusBoxIfHidden();
  var _div = $("<div/>", { class: "alert alert-info alert-dismissable" });
  $('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>').appendTo(_div);
  $('<h4><i class="icon fa fa-info"></i> </h4>').append("View Changed at " + $.format.date(new Date(), 'MM/dd/yyyy HH:mm:ss')).appendTo(_div);
  _div.append($("<div />").append($("#content-title-desc").html()));
  $("#status-subbox").prepend(_div);
}

function extractEnvPartProfile (tag_env, tag_part) {
  var info_env = searchConfigByTagEnv(tag_env);
  var info_part = searchConfigByTagPart(tag_part);
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
