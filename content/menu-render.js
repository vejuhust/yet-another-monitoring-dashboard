
var _seperator = '_';

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
  $.each(item.sub, function (index) {
    this.icon = index == 0 ? "fa fa-certificate" : "fa fa-circle-o";
    _ul.append(createSingleLevelMenuItem(this));
  });

  return $("<li/>", { class: "treeview" }).append(_a).append(_ul);
}

function renderEnvironmentMenuItems () {
  var menu_env = $("#menu-env");
  var item_list = []
  $.each(menu_env_data, function (index) {
    item_list.push(this.sub 
      ? createMultiLevelMenuItem(this)
      : createSingleLevelMenuItem(this)
    );
  });

  $.each(item_list.reverse(), function () {
    menu_env.after(this);
  });
}

function renderPartnerMenuItems () {
  var menu_part = $("#menu-part");
  var item_list = []
  $.each(menu_part_data, function (index, item) {
    item_list.push(createSingleLevelMenuItem(item).click(function (event) {
      event.preventDefault();
      appendToHashTag(item.link);
    }));
  });

  $.each(item_list.reverse(), function () {
    menu_part.after(this);
  });
}

function extractHashTag () {
  return window.location.hash.substr(1);
}

function appendToHashTag (suffix) {
  var main = window.location.hash.split(_seperator)[0];
  if (main && main != "#") {
    window.location.hash = main + _seperator + suffix;
    console.log(window.location.hash);
  }
}

function activateTaggedMenuItems () {
  tags = window.location.hash.substr(1).split(_seperator);
  if (tags[0] || tags[0]) {
    $(".sidebar-menu li[class~=active]").removeClass("active");
    $.each(tags, function (index, tag) {
      var selector = ".sidebar-menu a[href=#" + tag + "]";
      var target = $(selector);
      if (target) {
        target.parent("li").addClass("active");
        target.parent("li").parent().parent("li").addClass("active");
      }
    });
  }
}


renderEnvironmentMenuItems();
renderPartnerMenuItems();
activateTaggedMenuItems();
