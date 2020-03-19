'use strict';
(function () {
  var ENTER_BUTTON = 'Enter';
  var LEFT_BUTTON_MOUSE = 0;

  var limits = {
    left: window.map.mapElement.offsetLeft,
    right: window.map.mapElement.offsetWidth + window.map.mapElement.offsetLeft,
    top: window.map.MIN_MAP_HEIGHT - (window.pins.MAIN_PIN_WIDTH_INACTIVE / 2),
    bottom: window.map.MAX_MAP_HEIGHT - (window.pins.MAIN_PIN_WIDTH_INACTIVE / 2),
  };

  var pinClickHandler = function (clickEvt) {
    if (clickEvt.button === LEFT_BUTTON_MOUSE) {
      clickEvt.preventDefault();

      window.map.activatePage();

      var checkPosition = function (evt) {
        var shift = {
          x: startCoords.x - evt.clientX,
          y: startCoords.y - evt.clientY
        };

        startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        if (evt.clientX < limits.left) {
          window.pins.mainPin.style.left = (window.map.MIN_MAP_WIDTH - window.pins.MAIN_PIN_WIDTH_ACTIVE / 2) + 'px';
        } else if (evt.clientX > limits.right) {
          window.pins.mainPin.style.left = (window.map.mapElement.offsetWidth - window.pins.MAIN_PIN_WIDTH_ACTIVE / 2) + 'px';
        } else {
          window.pins.mainPin.style.left = (window.pins.mainPin.offsetLeft - shift.x) + 'px';
        }

        if (evt.clientY < limits.top) {
          window.pins.mainPin.style.top = limits.top + 'px';
        } else if (evt.clientY > limits.bottom) {
          window.pins.mainPin.style.top = limits.bottom + 'px';
        } else {
          window.pins.mainPin.style.top = (window.pins.mainPin.offsetTop - shift.y) + 'px';
        }
      };

      var startCoords = {
        x: clickEvt.clientX,
        y: clickEvt.clientY
      };

      var mouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();
        checkPosition(moveEvt);
        window.form.recordAddressOnTipEnd(true);
      };

      var mouseUpHandler = function (upEvt) {
        upEvt.preventDefault();
        checkPosition(upEvt);
        document.removeEventListener('mousemove', mouseMoveHandler);
        window.removeEventListener('mouseup', mouseUpHandler);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      window.addEventListener('mouseup', mouseUpHandler);
    }
  };

  var pinPressHandler = function (evt) {
    if (evt.key === ENTER_BUTTON) {
      evt.preventDefault();
      window.map.activatePage();
      window.pins.mainPin.removeEventListener('keydown', pinPressHandler);
    }
  };

  window.pins.mainPin.addEventListener('mousedown', pinClickHandler);
  window.pins.mainPin.addEventListener('keydown', pinPressHandler);
})();
