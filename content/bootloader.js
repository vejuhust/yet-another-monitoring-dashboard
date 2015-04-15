
// Render the environment & partner menus
renderEnvironmentMenuItems();
renderPartnerMenuItems();

// Events binding
window.onhashchange = _handlerRefreshMenuAndPage;

// Update the menu and render the content
_handlerRefreshMenuAndPage();
