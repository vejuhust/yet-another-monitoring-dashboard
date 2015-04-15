
// Render menus on the left side
renderEnvironmentMenuItems();
renderPartnerMenuItems();

// Events binding
window.onhashchange = _handlerUpdatePage;

// Force the first refresh
_handlerUpdatePage();

// // Update the menu and render the content
// _handlerRefreshMenuAndPage();

// (function myLoop (i) {          
//   setTimeout(function () {   
//     renderGaugeRowItems();
//     if (--i) {
//       myLoop(i);
//     }
//   }, 3000)
// })(1000);
