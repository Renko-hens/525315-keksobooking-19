'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var PIN_WIDTH = mainPin.offsetWidth;
  var PIN_HEIGHT = mainPin.offsetHeight;


  // Модуль Пина
  var createPin = function (data, template) {
    var pin = template.cloneNode(true);
    pin.setAttribute('data-pin-id', data.offer.id);
    pin.style.cssText = 'left: ' + (data.location.x - (PIN_WIDTH / 2)) + 'px;' + 'top: ' + (data.location.y - PIN_HEIGHT) + 'px;';
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

  window.pin = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    mainPin: mainPin,
    renderPin: renderPin
  };

})();
