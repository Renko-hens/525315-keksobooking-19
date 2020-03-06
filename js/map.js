'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPinsContainer = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var ESC_BUTTON = 'Escape';

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
    if (map.classList.contains('map--faded')) {
      map.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');

      window.pins.renderPin(window.data.mocks, mapPinsContainer, pinTemplate);
      window.card.renderCard(window.data.mocks, mapPinsContainer, cardTemplate);
      window.form.activateForm();

      map.addEventListener('click', mapClickHandler);
      map.addEventListener('keydown', mapPressHandler);
    }
    return false;
  };

  window.map = {
    activatePage: activatePage,
    mapElement: map
  };
})();
