console.log("menu-fill");

var menu_env = $("#menu-env");


var item1 = menu_env_data[0];
var item2 = menu_env_data[1];

function createSingleLevelMenuItem (item) {
  var _a = $("<a/>", { href: item.link });
  $("<i/>", { class: item.icon }).appendTo(_a);
  $("<span/>", { text: " " + item.name }).appendTo(_a);
  return $("<li/>").append(_a);
}

function createMultiLevelMenuItem (item) {
  var _a = $("<a/>", { href: "#" });
  $("<i/>", { class: item.icon }).appendTo(_a);
  $("<span/>", { text: " " + item.name }).appendTo(_a);
  $("<span/>", { class: "label label-primary pull-right", text: item.sub.length - 1 }).appendTo(_a);
  var _li = $("<li/>", { class: "treeview" }).append(_a);
  return _li;
}

var div1 = createSingleLevelMenuItem(item1);
menu_env.after(div1);

var div2 = createMultiLevelMenuItem(item2);
menu_env.after(div2);
