'use strict';

window.showCard = (function () {
  var sectionTokyo = document.querySelector('.tokyo');

  var templateDialog = document.querySelector('#dialog-template');
  var dialogToClone = templateDialog.content.querySelector('.dialog');
  var dialog = dialogToClone.cloneNode(true);

  var dialogTitle = dialog.querySelector('.dialog__title');
  var userAvatar = dialogTitle.querySelector('img');

  var dialogClose = dialog.querySelector('.dialog__close');

  var lodgeTitle = dialog.querySelector('.lodge__title');
  var lodgeAddress = dialog.querySelector('.lodge__address');
  var lodgePrice = dialog.querySelector('.lodge__price');
  var lodgeType = dialog.querySelector('.lodge__type');
  var lodgeRoomsAndGuests = dialog.querySelector('.lodge__rooms-and-guests');
  var lodgeCheckinTime = dialog.querySelector('.lodge__checkin-time');
  var lodgeFeatures = dialog.querySelector('.lodge__features');
  var lodgeDescription = dialog.querySelector('.lodge__description');
  var lodgePhotos = dialog.querySelector('.lodge__photos');

  var pinEvent = null;
  var changePin = null;

  var setDeclension = function (number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles [(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  };

  var fillFeatures = function (data) {
    lodgeFeatures.innerHTML = '';
    data.offer.features.forEach(function (feature) {
      var newFeature = document.createElement('span');
      newFeature.classList.add('feature__image');
      newFeature.classList.add('feature__image--' + feature);
      lodgeFeatures.appendChild(newFeature);
    });
  };

  var fillPhotos = function (data) {
    lodgePhotos.innerHTML = '';
    data.offer.photos.forEach(function (photo) {
      var newPhoto = document.createElement('img');
      newPhoto.setAttribute('src', photo);
      newPhoto.setAttribute('alt', 'Lodge photo');
      newPhoto.setAttribute('width', 52);
      newPhoto.setAttribute('height', 42);
      lodgePhotos.appendChild(newPhoto);
    });
  };

  var fillCard = function (data) {
    var guestsDeclension = ['гостя', 'гостей', 'гостей'];
    var roomsDeclension = ['комната', 'комнаты', 'комнат'];

    userAvatar.setAttribute('src', data.author.avatar);
    userAvatar.setAttribute('alt', 'Avatar');

    lodgeTitle.textContent = data.offer.title;
    lodgeAddress.textContent = data.offer.address;
    lodgePrice.textContent = data.offer.price + '₽/ночь';
    lodgeType.textContent = data.offer.type;
    lodgeRoomsAndGuests.textContent = data.offer.rooms + ' '
                                      + setDeclension(data.offer.rooms, roomsDeclension)
                                      + ' для ' + data.offer.guests + ' '
                                      + setDeclension(data.offer.rooms, guestsDeclension);
    lodgeCheckinTime.textContent = 'Заезд после ' + data.offer.checkin
                                    + ', выезд до ' + data.offer.checkout;
    fillFeatures(data);
    lodgeDescription.textContent = data.description;
    fillPhotos(data);
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
    if (typeof changePin === 'function') {
      changePin(pinEvent);
    }

    dialog.style.display = 'block';
    dialog.setAttribute('aria-hidden', false);
    dialogClose.setAttribute('area-pressed', false);
    sectionTokyo.appendChild(dialog);
    addListenersToCloseBtn();


  };

  var hideDialog = function () {
    dialog.style.display = 'none';
    dialog.setAttribute('aria-hidden', true);
    dialogClose.setAttribute('area-pressed', true);
    sectionTokyo.removeChild(dialog);
    removeListenersFromCloseBtn();

    if (typeof changePin === 'function') {
      changePin(pinEvent);
    }
  };

  var hideDialogByKey = function (evt) {
    if (window.isEnterPressed(evt)) {
      hideDialog();
    }
  };

  return function (evt, data, callback) {
    pinEvent = evt;
    changePin = callback;

    fillCard(data);
    showDialog();
  };

})();
