'use strict';

window.card = (function () {
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
  var onPinChange = null;

  var guestsDeclension = ['гостя', 'гостей', 'гостей'];
  var roomsDeclension = ['комната', 'комнаты', 'комнат'];

  // Определение склонения существительного после числительного
  var setDeclension = function (num, titles) {
    var mod10 = num % 10;
    var mod100 = num % 100;

    if (mod10 === 1 && mod100 !== 11) {
      return titles[0];
    } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
      return titles[1];
    } else {
      return titles[2];
    }
  };

  // Добавление особенностей в карточку жилья
  var fillFeatures = function (data) {
    lodgeFeatures.innerHTML = '';

    data.offer.features.forEach(function (feature) {
      var newFeature = document.createElement('span');
      newFeature.classList.add('feature__image');
      newFeature.classList.add('feature__image--' + feature);
      lodgeFeatures.appendChild(newFeature);
    });
  };

  // Добавление фотографий в карточку жилья
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

  // Добавление содержимого в карточку жилья
  var fillCard = function (data) {
    userAvatar.setAttribute('src', data.author.avatar);
    userAvatar.setAttribute('alt', 'Avatar');

    lodgeTitle.textContent = data.offer.title;
    lodgeAddress.textContent = data.offer.address;
    lodgePrice.textContent = data.offer.price + '₽/ночь';
    lodgeType.textContent = data.offer.type;
    lodgeRoomsAndGuests.textContent = data.offer.rooms + ' '
                                      + setDeclension(data.offer.rooms, roomsDeclension)
                                      + ' для ' + data.offer.guests + ' '
                                      + setDeclension(data.offer.guests, guestsDeclension);
    lodgeCheckinTime.textContent = 'Заезд после ' + data.offer.checkin
                                    + ', выезд до ' + data.offer.checkout;
    fillFeatures(data);
    lodgeDescription.textContent = data.description;
    fillPhotos(data);
  };

  // Добавление листенеров для кнопки закрытия диалога ("крестика")
  var addListenersToCloseBtn = function () {
    dialogClose.addEventListener('click', hideDialog);
    dialogClose.addEventListener('keydown', hideDialogByKey);
  };

  // Удаление листенеров у кнопки закрытия диалога ("крестика")
  var removeListenersFromCloseBtn = function () {
    dialogClose.removeEventListener('click', hideDialog);
    dialogClose.removeEventListener('keydown', hideDialogByKey);
  };

  // Показ карточки жилья
  var showDialog = function () {
    onPinChange(pinEvent);

    dialog.style.display = 'block';
    dialog.setAttribute('aria-hidden', false);
    dialogClose.setAttribute('area-pressed', false);
    sectionTokyo.appendChild(dialog);

    addListenersToCloseBtn();
  };

  // Скрытие карточки жилья
  var hideDialog = function () {
    dialog.style.display = 'none';
    dialog.setAttribute('aria-hidden', true);
    dialogClose.setAttribute('area-pressed', true);

    if (sectionTokyo.contains(dialog)) {
      sectionTokyo.removeChild(dialog);
    }

    removeListenersFromCloseBtn();

    if (typeof onPinChange === 'function') {
      onPinChange(pinEvent);
    }
  };

  // Скрытие карточки жилья при активации события с клавиатуры
  var hideDialogByKey = function (evt) {
    if (window.isEnterPressed(evt)) {
      hideDialog();
    }
  };

  return {
    show: function (evt, data, callback) {
      pinEvent = evt;
      onPinChange = callback;

      fillCard(data);
      showDialog();
    },
    hide: hideDialog
  };
})();
