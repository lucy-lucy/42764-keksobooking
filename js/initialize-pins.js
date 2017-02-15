'use strict';

(function () {
  var pinMap = document.querySelector('.tokyo__pin-map');

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

  var handlePinSelection = function (evt, callback) {
    var target = evt.target;

    while (target !== pinMap) {
      if (target.classList.contains('pin')) {
        window.showCard(target, activatePin, disableActivePin, callback);
        return;
      }
      target = target.parentNode;
    }
  };

  var handlePinSelectionByKey = function (evt) {
    if (window.isEnterPressed(evt)) {
      handlePinSelection(evt, function () {
        evt.target.focus();
      });
    }
  };

  pinMap.addEventListener('click', handlePinSelection);

  pinMap.addEventListener('keydown', handlePinSelectionByKey);
})();
