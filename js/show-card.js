'use strict';

window.showCard = (function () {
  var dialog = document.querySelector('.dialog');
  var dialogClose = dialog.querySelector('.dialog__close');

  var switchOn = null;
  var switchOff = null;
  var callback = null;

  var addListenersToCloseBtn = function () {
    dialogClose.addEventListener('click', hideDialog);
    dialogClose.addEventListener('keydown', hideDialogByKey);
  };

  var removeListenersFromCloseBtn = function () {
    dialogClose.removeEventListener('click', hideDialog);
    dialogClose.removeEventListener('keydown', hideDialogByKey);
  };

  var showDialog = function (target) {
    if (typeof switchOff === 'function') {
      switchOff();
    }

    if (typeof switchOn === 'function') {
      switchOn(target);
    }

    dialog.style.display = 'block';
    dialog.setAttribute('aria-hidden', false);
    dialogClose.setAttribute('area-pressed', false);
    addListenersToCloseBtn();
  };

  var hideDialog = function () {
    dialog.style.display = 'none';
    dialog.setAttribute('aria-hidden', true);
    dialogClose.setAttribute('area-pressed', true);
    removeListenersFromCloseBtn();

    if (typeof switchOff === 'function') {
      switchOff();
    }

    if (typeof callback === 'function') {
      callback();
    }
  };

  var hideDialogByKey = function (evt) {
    if (window.isEnterPressed(evt)) {
      hideDialog();
    }
  };

  addListenersToCloseBtn();

  return function (target, activatePinCallback, disableActivePinCallback, keyDownCallback) {
    switchOn = activatePinCallback;
    switchOff = disableActivePinCallback;
    callback = keyDownCallback;

    showDialog(target);
  };

})();
