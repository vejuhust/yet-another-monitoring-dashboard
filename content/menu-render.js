
var _seperator = '_';

var _handlerEnvironmentMenu = function (event) {
  event.preventDefault();
  // Update hash tag in URL
  window.location.hash = "#" + event.data;
  // Activate menu item as per hash tag
  var tags = extractHashTags();
  activateTaggedMenuItems(tags[0], tags[1]);
  // Render the main page
  renderMainPage(tags[0], tags[1]);
};

var _handlerPartnerMenu = function (event) {
  event.preventDefault();
  // Update hash tag in URL
  var tags = extractHashTags();
  if (appendToHashTag(tags[0], tags[1], event.data)) {
    // Activate menu item as per hash tag
    var tags = extractHashTags();
    activateTaggedMenuItems(tags[0], tags[1]);
    // Render the main page
    renderMainPage(tags[0], tags[1]);
  }
};

function createLinkItem (item) {
  var _a = $("<a/>", { href: "#" + item.link });
  $("<i/>", { class: item.icon }).appendTo(_a);
  $("<span/>", { text: " " + item.name }).appendTo(_a);
  return _a;
}

function createSingleLevelMenuItem (item) {
  return $("<li/>").append(createLinkItem(item));
}

function createMultiLevelMenuItem (item) {
  item.link = "";
  var _a = createLinkItem(item);
  $("<span/>", { class: "label label-primary pull-right", text: item.sub.length - 1 }).appendTo(_a);

  var _ul = $("<ul/>", { class: "treeview-menu" });
  $.each(item.sub, function (index, item) {
    item.icon = index == 0 ? "fa fa-certificate" : "fa fa-circle-o";
    _ul.append(createSingleLevelMenuItem(item).click(item.link, _handlerEnvironmentMenu));
  });

  return $("<li/>", { class: "treeview" }).append(_a).append(_ul);
}

function renderEnvironmentMenuItems () {
  var menu_env = $("#menu-env");
  var item_list = []
  $.each(menu_env_data, function (index, item) {
    item_list.push(item.sub 
      ? createMultiLevelMenuItem(item)
      : createSingleLevelMenuItem(item).click(item.link, _handlerEnvironmentMenu));
  });

  $.each(item_list.reverse(), function () {
    menu_env.after(this);
  });
}

function renderPartnerMenuItems () {
  var menu_part = $("#menu-part");
  var item_list = []
  $.each(menu_part_data, function (index, item) {
    item_list.push(createSingleLevelMenuItem(item).click(item.link, _handlerPartnerMenu));
  });

  $.each(item_list.reverse(), function () {
    menu_part.after(this);
  });
}

function extractHashTags () {
  return window.location.hash.substr(1).split(_seperator);
}

function appendToHashTag (tag_env, tag_part, suffix) {
  var result = false;
  if (tag_env) {
    window.location.hash = tag_part == suffix ? tag_env : tag_env + _seperator + suffix;
    result = true;
  }
  return result;
}

function activateTaggedMenuItems (tag_env, tag_part) {
  var tags = [tag_env, tag_part];
  if (tag_env || tag_part) {
    $(".sidebar-menu li[class~=active]").removeClass("active");
    $.each(tags, function (index, tag) {
      if (tag) {
        var selector = ".sidebar-menu a[href=#" + tag + "]";
        var target = $(selector);
        if (target) {
          target.parent("li").addClass("active");
          target.parent("li").parent().parent("li").addClass("active");
        }
      }});
  }
}


renderEnvironmentMenuItems();
renderPartnerMenuItems();
activateTaggedMenuItems();

