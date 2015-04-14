console.log("menu-fill");

var menu_env = $("#menu-env");


var item1 = menu_env_data[0];
var item2 = menu_env_data[1];


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

$.each(menu_env_data, function (index) {
  if (this.sub) {
    menu_env.after(createMultiLevelMenuItem(this));
  }
  else {
    menu_env.after(createSingleLevelMenuItem(this));
  }
});
