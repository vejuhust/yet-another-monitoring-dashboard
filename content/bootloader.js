
// Render the environment & partner menus
renderEnvironmentMenuItems();
renderPartnerMenuItems();
renderGaugeRowItems();

// Events binding
window.onhashchange = _handlerRefreshMenuAndPage;

// Update the menu and render the content
_handlerRefreshMenuAndPage();
