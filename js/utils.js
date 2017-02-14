'use strict';

window.isEnterPressed = (function () {
  var ENTER_KEY_CODE = 13;

  return function (evt) {
    return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
  };
})();
