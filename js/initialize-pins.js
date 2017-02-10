'use strict';

window.initializePins = function () {
  var pinMap = document.querySelector('.tokyo__pin-map');

  var dialog = document.querySelector('.dialog');
  var dialogClose = dialog.querySelector('.dialog__close');

  var ENTER_KEY_CODE = 13;
  var isEnterPressed = function (evt) {
    return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
  };

  var activatePin = function (pin) {
    pin.classList.add('pin--active');
    pin.setAttribute('aria-checked', true);
  };
  var disableActivePin = function () {
    var activePin = document.querySelector('.pin--active');
    if (activePin) {
      activePin.classList.remove('pin--active');
      activePin.setAttribute('aria-checked', false);
    }
  };

  var addListenersToCloseBtn = function () {
    dialogClose.addEventListener('click', hideDialog);
    dialogClose.addEventListener('keydown', hideDialogByKey);
  };
  var removeListenersFromCloseBtn = function () {
    dialogClose.removeEventListener('click', hideDialog);
    dialogClose.removeEventListener('keydown', hideDialogByKey);
  };

  var showDialog = function () {
    dialog.style.display = 'block';
    dialog.setAttribute('aria-hidden', false);
    dialogClose.setAttribute('area-pressed', false);
    addListenersToCloseBtn();
  };
  var hideDialog = function () {
    disableActivePin();
    dialog.style.display = 'none';
    dialog.setAttribute('aria-hidden', true);
    dialogClose.setAttribute('area-pressed', true);
    removeListenersFromCloseBtn();
  };
  var hideDialogByKey = function (evt) {
    if (isEnterPressed(evt)) {
      hideDialog();
    }
  };

  var handlePinSelection = function (evt) {
    var target = evt.target;

    while (target !== pinMap) {
      if (target.classList.contains('pin')) {
        disableActivePin();
        activatePin(target);
        showDialog();
        return;
      }
      target = target.parentNode;
    }
  };
  var handlePinSelectionByKey = function (evt) {
    if (isEnterPressed(evt)) {
      handlePinSelection(evt);
    }
  };

  addListenersToCloseBtn();

  pinMap.addEventListener('click', handlePinSelection);

  pinMap.addEventListener('keydown', handlePinSelectionByKey);
};
