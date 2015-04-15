
// Render the environment & partner menus
renderEnvironmentMenuItems();
renderPartnerMenuItems();
renderGaugeItems();

// Events binding
window.onhashchange = _handlerRefreshMenuAndPage;

// Update the menu and render the content
_handlerRefreshMenuAndPage();
