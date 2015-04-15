
// Render the environment & partner menus
renderEnvironmentMenuItems();
renderPartnerMenuItems();
renderGaugeRowItems();

// Events binding
window.onhashchange = _handlerRefreshMenuAndPage;

// Update the menu and render the content
_handlerRefreshMenuAndPage();

(function myLoop (i) {          
  setTimeout(function () {   
    renderGaugeRowItems();
    if (--i) {
      myLoop(i);
    }
  }, 3000)
})(1000);
