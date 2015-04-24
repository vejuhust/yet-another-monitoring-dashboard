
// Render menus on the left side
renderEnvironmentMenuItems();
renderPartnerMenuItems();

// Events binding
window.onhashchange = _handlerUpdatePage;

// Force the first refresh
_handlerUpdatePage();

$("#search-select").select2({ 
  width: "resolve",
  allowClear: true,
  placeholder: "type whatever you want -,-",
});
