'use strict';

var pin = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');

if (dialog) {
  var dialogClose = dialog.querySelector('.dialog__close');
}

var notice = document.querySelector('.notice');

if (notice) {
  var noticeTitle = notice.querySelector('#title');

  var noticeLodgingType = notice.querySelector('#type');
  var noticePrice = notice.querySelector('#price');

  var noticeAddress = notice.querySelector('#address');

  var noticeTime = notice.querySelector('#time');
  var noticeTimeOut = notice.querySelector('#timeout');

  var noticeRoomNumber = notice.querySelector('#room_number');
  var noticeGuestsCapacity = notice.querySelector('#capacity');
}

var disableActivePin = function () {
  var activePin = document.querySelector('.pin--active');
  if (activePin) {
    activePin.classList.remove('pin--active');
  }
};

var isOneRoom = function () {
  return noticeRoomNumber.value === '1';
};

if (pin) {
  Array.prototype.forEach.call(pin, function (pinItem) {
    pinItem.addEventListener('click', function () {
      disableActivePin();
      pinItem.classList.add('pin--active');
      dialog.style.display = 'block';
    });
  });
}

if (dialogClose) {
  dialogClose.addEventListener('click', function () {
    disableActivePin();
    dialog.style.display = 'none';
  });
}

if (noticeTitle) {
  noticeTitle.requred = true;
  noticeTitle.pattern = '.{30,100}';
}

if (noticePrice) {
  noticePrice.required = true;
  noticePrice.type = 'number';
  noticePrice.min = 1000;
  noticePrice.max = 1000000;
}

if (noticeAddress) {
  noticeAddress.required = true;
}

if (noticeTime && noticeTimeOut) {
  noticeTime.addEventListener('change', function () {
    noticeTimeOut.value = noticeTime.value;
  });

  noticeTimeOut.addEventListener('change', function () {
    noticeTime.value = noticeTimeOut.value;
  });
}

if (noticeLodgingType && noticePrice) {
  noticeLodgingType.addEventListener('change', function () {
    switch (noticeLodgingType.value) {
      case 'apartment' : noticePrice.min = 1000;
        break;
      case 'shack' : noticePrice.min = 0;
        break;
      case 'palace' : noticePrice.min = 10000;
        break;
    }
  });
}

if (noticeRoomNumber && noticeGuestsCapacity) {
  if (isOneRoom()) {
    noticeGuestsCapacity.value = 0;
  }

  noticeRoomNumber.addEventListener('change', function () {
    noticeGuestsCapacity.value = isOneRoom() ? 0 : 3;
  });
}
