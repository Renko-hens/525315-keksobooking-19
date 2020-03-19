'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var MAIN_PIN_WIDTH_ACTIVE = 65;
  var MAIN_PIN_HEIGHT_ACTIVE = 81;

  var MAIN_PIN_WIDTH_INACTIVE = 65;
  var MAIN_PIN_HEIGHT_INACTIVE = 65;

  // Модуль Пина
  var createPin = function (data, template) {
    var pin = template.cloneNode(true);
    pin.setAttribute('data-pin-id', data.offer.id);
    pin.style.cssText = 'left: ' + (data.location.x - (PIN_WIDTH / 2)) + 'px;' + 'top: ' + (data.location.y - (PIN_HEIGHT / 2)) + 'px;';
    pin.querySelector('img').src = data.author.avatar;
    pin.querySelector('img').alt = data.offer.title;
    return pin;
  };

  var renderPin = function (arrayData, parent, template) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrayData.length; i++) {
      fragment.appendChild(createPin(arrayData[i], template));
    }
    parent.appendChild(fragment);
  };

  window.pins = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    MAIN_PIN_WIDTH_ACTIVE: MAIN_PIN_WIDTH_ACTIVE,
    MAIN_PIN_HEIGHT_ACTIVE: MAIN_PIN_HEIGHT_ACTIVE,
    MAIN_PIN_WIDTH_INACTIVE: MAIN_PIN_WIDTH_INACTIVE,
    MAIN_PIN_HEIGHT_INACTIVE: MAIN_PIN_HEIGHT_INACTIVE,
    mainPin: mainPin,
    renderPin: renderPin
  };

})();
