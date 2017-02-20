'use strict';

window.render = (function () {
  var templatePin = document.querySelector('#pin-template');
  var pinToClone = templatePin.content.querySelector('.pin');

  var setAttributesForARIA = function (pin) {
    pin.setAttribute('tabindex', 0);
    pin.setAttribute('role', 'menuitemradio');
    pin.setAttribute('aria-checked', false);
  };

  var setLocation = function (pin, data) {
    pin.style.top = data.location.y + 'px';
    pin.style.left = data.location.x + 'px';
  };

  var setImage = function (pin, data) {
    var image = pin.querySelector('img');
    image.setAttribute('src', data.author.avatar);
    image.setAttribute('alt', 'User Avatar');
  };

  return function (data) {
    var renderedPin = pinToClone.cloneNode(true);

    setImage(renderedPin, data);
    setLocation(renderedPin, data);
    setAttributesForARIA(renderedPin);

    return renderedPin;
  };
})();
