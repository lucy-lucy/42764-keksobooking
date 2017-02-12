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

  noticeTitle.requred = true;
  noticeTitle.pattern = '.{30,100}';

  noticePrice.required = true;
  noticePrice.type = 'number';
  noticePrice.min = 1000;
  noticePrice.max = 1000000;

  noticeAddress.required = true;

  window.synchronizeFields(noticeRoomNumber, noticeGuestsCapacity, roomNumberValues, guestsCapacityValues, 'value');

  noticeTime.addEventListener('change', function () {
    window.synchronizeFields(noticeTime, noticeTimeOut, timeValues, timeOutValues, 'value');
  });

  noticeTimeOut.addEventListener('change', function () {
    window.synchronizeFields(noticeTimeOut, noticeTime, timeOutValues, timeValues, 'value');
  });

  noticeLodgingType.addEventListener('change', function () {
    window.synchronizeFields(noticeLodgingType, noticePrice, lodgingTypesValues, priceValues, 'min');
  });

  noticeRoomNumber.addEventListener('change', function () {
    window.synchronizeFields(noticeRoomNumber, noticeGuestsCapacity, roomNumberValues, guestsCapacityValues, 'value');
  });
})();
