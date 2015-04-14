
function createLinkItem (item) {
  var _a = $("<a/>", { href: item.link });
  $("<i/>", { class: item.icon }).appendTo(_a);
  $("<span/>", { text: " " + item.name }).appendTo(_a);
  return _a;
}

function createSingleLevelMenuItem (item) {
  return $("<li/>").append(createLinkItem(item));
}

function createMultiLevelMenuItem (item) {
  item.link = "#";
  var _a = createLinkItem(item);
  $("<span/>", { class: "label label-primary pull-right", text: item.sub.length - 1 }).appendTo(_a);

  var _ul = $("<ul/>", { class: "treeview-menu" });
  $.each(item.sub, function (index) {
    this.icon = index == 0 ? "fa fa-certificate" : "fa fa-circle-o";
    _ul.append(createSingleLevelMenuItem(this));
  });

  return $("<li/>", { class: "treeview" }).append(_a).append(_ul);
}

function renderEnvironmentMenuItems (menu_env) {
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

function extractHashTag () {
  return window.location.hash.substr(1);
}

function activateTaggedEnvironmentMenuItem (tag) {
  if (tag) {
    selector = ".sidebar-menu a[href=#" + tag + "]";
    var target = $(selector);
    if (target) {
      $(".sidebar-menu li[class~=active]").removeClass("active");
      target.parent("li").addClass("active");
      target.parent("li").parent().parent("li").addClass("active");
    }
  }
}

console.log("menu-fill");

renderEnvironmentMenuItems($("#menu-env"))

var tag = extractHashTag();
console.log(tag);
activateTaggedEnvironmentMenuItem(tag);
