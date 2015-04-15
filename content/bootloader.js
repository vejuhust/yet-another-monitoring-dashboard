
// Render menus on the left side
renderEnvironmentMenuItems();
renderPartnerMenuItems();

// Events binding
window.onhashchange = _handlerUpdatePage;

// Force the first refresh
_handlerUpdatePage();
