
var _prefix_env = "env:";
var _prefix_part = "part:";

function renderSearchBoxWithAutoComplete () {
  // Prepare data for Select2 in select/option DOM structure
  var searchbox_dropdown = $("<select/>", { id: "search-select", class: "form-control", multiple: "true", style: "display:none;" });
  var _list_env = createSelectOptionListWithConfigData(menu_env_data, _prefix_env);
  var _list_part = createSelectOptionListWithConfigData(menu_part_data, _prefix_part);
  $.each(_list_env.concat(_list_part), function (index, _opt) {
    searchbox_dropdown.append(_opt);
  });
  $("#search-select").replaceWith(searchbox_dropdown);

  // Enable auto-complete feature in search box with Select2
  var searchbox_autocomplete = $("#search-select").select2({ 
    width: "resolve",
    allowClear: true,
    placeholder: "type whatever you want -,-",
  });

  // Event binding for selection in search box
  searchbox_autocomplete.on("change", handleSearchBoxSelection);
}

function handleSearchBoxSelection (event) {
  var _list = $("#search-select").val();
  var _selected_env = undefined;
  var _selected_part = undefined;

  if (_list) {
    // Extract first selected environment and partner in menu order
    for (var len = _list.length, index = 0; index < len; index++) {
      var _selected = _list[index];
      if (_selected_env && _selected_part) {
        break;
      }
      else if (!_selected_env) {
        _selected_env = extractValueAfterPrefix(_selected, _prefix_env);
      }
      else if (!_selected_part) {
        _selected_part = extractValueAfterPrefix(_selected, _prefix_part);
      }
    }

    console.log(_selected_env, _selected_part, _list);
  }
}

function extractValueAfterPrefix(_raw, _prefix) {
  var _result = undefined;
  var _pos = _raw.indexOf(_prefix);
  if (_pos >= 0) {
    _result = _raw.substr(_pos + _prefix.length);
  }
  return _result;
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
