// Page profile
var _page_profile = undefined;
updatePageProfile();

// Render menus and search box on the left side
renderEnvironmentMenuItems();
renderPartnerMenuItems();
renderSearchBoxWithAutoComplete();

// Events binding
window.onhashchange = _handlerUpdatePage;

// Force the first refresh
_handlerUpdatePage();
