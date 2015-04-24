
function renderSearchBoxWithAutoComplete () {
  var searchbox_dropdown = $("<select/>", { id: "search-select", class: "form-control", multiple: "multiple", style: "display:none;" });
  var _list_env = createSelectOptionListWithConfigData(menu_env_data, "env:");
  var _list_part = createSelectOptionListWithConfigData(menu_part_data, "part:");
  $.each(_list_env.concat(_list_part), function (index, _opt) {
    searchbox_dropdown.append(_opt);
  });
  $("#search-select").replaceWith(searchbox_dropdown);

  $("#search-select").select2({ 
    width: "resolve",
    allowClear: true,
    placeholder: "type whatever you want -,-",
  });
}

function createSelectOptionListWithConfigData (_data, _value_prefix) {
  var _list = [];
  $.each(_data, function (index, item) {
    _list.push(item.sub 
      ? createSelectOptionGroup(item, _value_prefix)
      : createSelectOption(item, _value_prefix));
  });
  return _list;
}

function createSelectOption (_data, _value_prefix) {
  return $("<option/>", { value: _value_prefix + _data.link, text: _data.name });
}

function createSelectOptionGroup (_data, _value_prefix) {
  var _optgroup = $("<optgroup/>", { label: _data.name });
  $.each(_data.sub, function (index, subitem) {
    _optgroup.append(createSelectOption(subitem, _value_prefix));
  });
  return _optgroup;
}
