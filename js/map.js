'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPinsContainer = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');


  var mainPinPositionX = window.pin.mainPin.offsetTop;
  var mainPinPositionY = window.pin.mainPin.offsetLeft;

  var ENTER_BUTTON = 'Enter';
  var ESC_BUTTON = 'Escape';
  var LEFT_BUTTON_MOUSE = 0;

  var mapClickHandler = function (evt) {
    var targetPin = evt.target.closest('.map__pin');
    var mapCards = map.querySelectorAll('.map__card');
    var buttonClose = evt.target.closest('.popup__close');
    var mapCardShown = map.querySelector('.map__card:not(.hidden)');

    if (buttonClose !== null) {
      mapCardShown.classList.add('hidden');
    }

    if (targetPin !== null && !targetPin.classList.contains('map__pin--main')) {
      mapCards.forEach(function (card) {
        if (card.classList.contains('hidden') && targetPin.dataset.pinId === card.dataset.cardId) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    }
  };

  var mapPressHandler = function (evt) {
    var mapCardShown = map.querySelector('.map__card:not(.hidden)');
    if (evt.key === ESC_BUTTON) {
      mapCardShown.classList.add('hidden');
    }
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');

    window.card.renderCard(window.data.mocks, mapPinsContainer, cardTemplate);
    window.pin.renderPin(window.data.mocks, mapPinsContainer, pinTemplate);
    window.form.enableInterface();

    window.form.inputAddress.disabled = true;
    window.form.inputAddress.value = Math.floor(mainPinPositionX + (window.pin.PIN_WIDTH / 2)) + ', ' + (mainPinPositionY + window.pin.PIN_HEIGHT);

    window.form.inputTitle.addEventListener('invalid', window.form.inputTitleValidationHandler);
    window.form.inputPrice.addEventListener('invalid', window.form.inputPriceValidationHandler);
    window.form.checkType();
    window.form.selectType.addEventListener('change', window.form.selectTypeChangeHandler);
    window.form.selectRooms.addEventListener('change', window.form.selectRoomChangeHandler);
    window.form.fieldsetTimes.addEventListener('change', window.form.fieldsetTimeChangeHandler);

    window.form.adForm.addEventListener('click', window.form.selectRoomChangeHandler);
    map.addEventListener('click', mapClickHandler);
    map.addEventListener('keydown', mapPressHandler);
  };

  var pinPressHandler = function (evt) {
    if (evt.button === LEFT_BUTTON_MOUSE || evt.key === ENTER_BUTTON) {
      activatePage();
    }
  };

  var documentLoadHandler = function () {
    window.form.inputAddress.value = Math.floor(mainPinPositionX + window.pin.PIN_WIDTH / 2) + ', ' + Math.floor(mainPinPositionY + window.pin.PIN_HEIGHT / 2);
  };

  window.pin.mainPin.addEventListener('mousedown', pinPressHandler);
  window.pin.mainPin.addEventListener('keydown', pinPressHandler);
  document.addEventListener('DOMContentLoaded', documentLoadHandler);
})();
