'use strict';

(function () {
  var pinMap = document.querySelector('.tokyo__pin-map');

  var similarApartments = [];

  var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';

  var filterContainer = document.querySelector('.tokyo__filters-container');
  var housingType = filterContainer.querySelector('#housing_type');
  var housingPrice = filterContainer.querySelector('#housing_price');
  var housingRoomNumber = filterContainer.querySelector('#housing_room-number');
  var housingGuestsNumber = filterContainer.querySelector('#housing_guests-number');
  var housingFeatures = filterContainer.querySelectorAll('input');

  // Активация метки
  var activatePin = function (pin) {
    pin.classList.add('pin--active');
    pin.setAttribute('aria-checked', true);
  };

  // Снятие активности с метки
  var deactivatePin = function () {
    var activePin = pinMap.querySelector('.pin--active');

    if (activePin !== null) {
      activePin.classList.remove('pin--active');
      activePin.setAttribute('aria-checked', false);
    }
  };

  // Удаление меток на карте и скрытие карточки жилья, если она была открыта
  var clearMap = function () {
    window.card.hide();

    var pins = pinMap.querySelectorAll('.pin');

    Array.prototype.forEach.call(pins, function (pin) {
      if (!pin.classList.contains('pin__main')) {
        pinMap.removeChild(pin);
      }
    });
  };

  // Функция-коллбэк для снятия активности с метки и возврата фокуса на метку
  var onCardShow = function (evt) {
    deactivatePin();

    if (window.isEnterPressed(evt)) {
      evt.target.focus();
    }
  };

  // Обработчик выбора текущего жилья
  var onPinSelect = function (evt, data) {
    var target = evt.target;

    while (target !== pinMap) {
      if (target.classList.contains('pin')) {
        window.card.show(evt, data, onCardShow);
        activatePin(target);
        return;
      }
      target = target.parentNode;
    }
  };

  // Обработчик выбора текущего жилья при активации события с клавиатуры
  var onPinSelectByKey = function (evt, data) {
    if (window.isEnterPressed(evt)) {
      onPinSelect(evt, data);
    }
  };

  // Отображение метки согласно загруженным данным
  var renderPin = function (data) {
    var newPin = window.render(data);
    pinMap.appendChild(newPin);

    newPin.addEventListener('click', function (evt) {
      onPinSelect(evt, data);
    });

    newPin.addEventListener('keydown', function (evt) {
      onPinSelectByKey(evt, data);
    });
  };

  // Проверка на соответствие ценовому диапазону
  var isInPriceRange = function (item) {
    switch (housingPrice.value) {
      case 'low':
        return item.offer.price < 1000;
      case 'middle':
        return item.offer.price >= 1000 && item.offer.price <= 10000;
      case 'hight':
        return item.offer.price > 10000;
    }
    return false;
  };

  var isChecked = function (elem) {
    return elem.checked;
  };

  var getValue = function (elem) {
    return elem.value;
  };

  // Проверка на содержание выбранных опций ("wi-fi", "conditioner" и др.)
  var includeSelectedFeatures = function (item) {
    var checkFeaturesName = function (elem) {
      return item.indexOf(elem) !== -1;
    };

    var checkedFeatures = Array.prototype.filter.call(housingFeatures, isChecked);
    var checkedFeaturesNames = checkedFeatures.map(getValue);

    return checkedFeatures === 'undefined' || checkedFeaturesNames.every(checkFeaturesName);
  };

  // Фильтрация объявления по заданным в фильтре значениям
  var filterByValues = function (item) {
    return (housingType.value === 'any' || item.offer.type === housingType.value)
            && isInPriceRange(item)
            && (housingRoomNumber.value === 'any' || item.offer.rooms === parseInt(housingRoomNumber.value, 10))
            && (housingGuestsNumber.value === 'any' || item.offer.guests === parseInt(housingGuestsNumber.value, 10))
            && includeSelectedFeatures(item.offer.features);
  };

  // Загрузка данных через AJAX и первичная отрисовка трех меток
  window.load(DATA_URL, function (data) {
    similarApartments = data;
    similarApartments.slice(0, 3).forEach(renderPin);
  });

  // Обновление меток при изменении значений в фильтре
  filterContainer.addEventListener('change', function () {
    clearMap();
    similarApartments.filter(filterByValues).forEach(renderPin);
  });
})();
