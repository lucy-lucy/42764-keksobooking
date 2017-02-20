'use strict';

(function () {
  var pinMap = document.querySelector('.tokyo__pin-map');

  var similarApartments = [];

  var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';

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

  var onChangeCard = function (evt) {
    disableActivePin();
    if (window.isEnterPressed(evt)) {
      evt.target.focus();
    }
  };

  var handlePinSelection = function (evt, data) {
    var target = evt.target;

    while (target !== pinMap) {
      if (target.classList.contains('pin')) {
        window.showCard(evt, data, onChangeCard);
        activatePin(target);
        return;
      }
      target = target.parentNode;
    }
  };

  var handlePinSelectionByKey = function (evt, data) {
    if (window.isEnterPressed(evt)) {
      handlePinSelection(evt, data);
    }
  };

  var renderPin = function (data) {
    var newPin = window.render(data);
    pinMap.appendChild(newPin);

    newPin.addEventListener('click', function (evt) {
      handlePinSelection(evt, data);
    });

    newPin.addEventListener('keydown', function (evt) {
      handlePinSelectionByKey(evt, data);
    });
  };

  var addPinsToMap = function (data) {
    similarApartments = data;
    similarApartments.slice(0, 3).forEach(renderPin);
  };

  window.load(DATA_URL, addPinsToMap);
})();
