'use strict';

(function () {
  var notice = document.querySelector('.notice');
  var noticeTitle = notice.querySelector('#title');
  var noticeLodgingType = notice.querySelector('#type');
  var noticePrice = notice.querySelector('#price');
  var noticeAddress = notice.querySelector('#address');
  var noticeTime = notice.querySelector('#time');
  var noticeTimeOut = notice.querySelector('#timeout');
  var noticeRoomNumber = notice.querySelector('#room_number');
  var noticeGuestsCapacity = notice.querySelector('#capacity');

  var timeValues = ['12', '13', '14'];
  var timeOutValues = ['12', '13', '14'];

  var lodgingTypesValues = ['shack', 'apartment', 'palace'];
  var priceValues = ['0', '1000', '10000'];

  var roomNumberValues = ['1', '2', '100'];
  var guestsCapacityValues = ['0', '3', '3'];

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  noticeTitle.requred = true;
  noticeTitle.pattern = '.{30,100}';

  noticePrice.required = true;
  noticePrice.type = 'number';
  noticePrice.min = 1000;
  noticePrice.max = 1000000;

  noticeAddress.required = true;
  noticeAddress.readOnly = true;

  // Двусторонняя синхронизация полей "Время заезда" и "Время выезда"
  window.synchronizeFields(noticeTime, noticeTimeOut, timeValues, timeOutValues, syncValues);
  window.synchronizeFields(noticeTimeOut, noticeTime, timeOutValues, timeValues, syncValues);

  // Односторонняя синхронизация поля "Тип жилья" с полем "«Цена за ночь»"
  window.synchronizeFields(noticeLodgingType, noticePrice, lodgingTypesValues, priceValues, syncValueWithMin);

  // Односторонняя синхронизация поля "Количество комнат" с полем "Количество гостей"
  window.synchronizeFields(noticeRoomNumber, noticeGuestsCapacity, roomNumberValues, guestsCapacityValues, syncValues);
})();
