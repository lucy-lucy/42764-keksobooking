'use strict';

var pinMap = document.querySelector('.tokyo__pin-map');

var dialog = document.querySelector('.dialog');
var dialogClose = dialog.querySelector('.dialog__close');

var notice = document.querySelector('.notice');
var noticeTitle = notice.querySelector('#title');
var noticeLodgingType = notice.querySelector('#type');
var noticePrice = notice.querySelector('#price');
var noticeAddress = notice.querySelector('#address');
var noticeTime = notice.querySelector('#time');
var noticeTimeOut = notice.querySelector('#timeout');
var noticeRoomNumber = notice.querySelector('#room_number');
var noticeGuestsCapacity = notice.querySelector('#capacity');

var ENTER_KEY_CODE = 13;

var isOneRoom = function () {
  return noticeRoomNumber.value === '1';
};

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


pinMap.addEventListener('click', handlePinSelection);

pinMap.addEventListener('keydown', handlePinSelectionByKey);


addListenersToCloseBtn();


noticeTitle.requred = true;
noticeTitle.pattern = '.{30,100}';

noticePrice.required = true;
noticePrice.type = 'number';
noticePrice.min = 1000;
noticePrice.max = 1000000;

noticeAddress.required = true;

noticeTime.addEventListener('change', function () {
  noticeTimeOut.value = noticeTime.value;
});

noticeTimeOut.addEventListener('change', function () {
  noticeTime.value = noticeTimeOut.value;
});

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

if (isOneRoom()) {
  noticeGuestsCapacity.value = 0;
}

noticeRoomNumber.addEventListener('change', function () {
  noticeGuestsCapacity.value = isOneRoom() ? 0 : 3;
});
