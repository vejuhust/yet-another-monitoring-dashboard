var _seperator = '_';

var _handlerPartnerMenu = function (event) {
  event.preventDefault();
  appendToHashTag(event.data);
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

function createMultiLevelMenuItem (item, _handler) {
  item.link = "";
  var _a = createLinkItem(item);
  $("<span/>", { class: "label label-primary pull-right", text: item.sub.length - (_handler ? 0 : 1) }).appendTo(_a);

  var _ul = $("<ul/>", { class: "treeview-menu" });
  $.each(item.sub, function (index, subitem) {
    if (_handler) {
      subitem.icon = "fa fa-user";
      _ul.append(createSingleLevelMenuItem(subitem).click(subitem.link, _handler));
    }
    else {
      subitem.icon = index == 0 ? "fa fa-certificate" : "fa fa-circle-o";
      _ul.append(createSingleLevelMenuItem(subitem));
    }
  });

  return $("<li/>", { class: "treeview" }).append(_a).append(_ul);
}

function renderEnvironmentMenuItems () {
  var menu_env = $("#menu-env");
  var item_list = []
  $.each(menu_env_data, function (index, item) {
    item_list.push(item.sub 
      ? createMultiLevelMenuItem(item)
      : createSingleLevelMenuItem(item));
  });

  $.each(item_list.reverse(), function () {
    menu_env.after(this);
  });
}

function renderPartnerMenuItems () {
  var menu_part = $("#menu-part");
  var item_list = []
  $.each(menu_part_data, function (index, item) {
    item_list.push(createMultiLevelMenuItem(item, _handlerPartnerMenu));
  });

  $.each(item_list.reverse(), function () {
    menu_part.after(this);
  });
}

function hasHasTagInUrl () {
  return window.location.hash.length > 0;
}

function extractHashTags () {
  var tags = window.location.hash.substr(1).split(_seperator);
  return {
    "env": tags[0],
    "part": tags[1],
  };
}

function appendToHashTag (suffix) {
  var tag = extractHashTags();
  var result = false;
  if (tag.env) {
    window.location.hash = tag.part == suffix ? tag.env : tag.env + _seperator + suffix;
    result = true;
  }
  return result;
}

function activateTaggedMenuItems () {
  $(".sidebar-menu li[class~=active]").removeClass("active");
  var tags = extractHashTags();
  if (tags.env || tags.part) {
    $.each(tags, function (index, tag) {
      if (tag) {
        var selector = ".sidebar-menu a[href=#" + tag + "]";
        var target = $(selector);
        if (target) {
          target.parent("li").addClass("active");
          target.parent("li").parent().parent("li").addClass("active");
        }
      }
    });
  }
  // Only when it's expanded
  if (!$(".sidebar-collapse").length) {
    if (tags.env) {
      // Collapse other expanded menu items
      var selector = "a[href=#" + tags.env + "]";
      $(".sidebar-menu ul.menu-open").each(function (index) { 
        if ($(this).find(selector).length == 0) {
          $(this).siblings().trigger("click");
        }; 
      });
    }
    else {
      // For default page, just collapse every item
      $(".sidebar-menu ul.menu-open").siblings().trigger("click");
    }
  }
}
