'use strict';
(function () {
  var map = document.querySelector('.map');
  var formMapFilters = map.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var inputAddress = adForm.querySelector('#address');
  var inputTitle = adForm.querySelector('#title');
  var buttonReset = adForm.querySelector('.ad-form__reset');

  var fieldsetTimes = adForm.querySelector('.ad-form__element--time');
  var selectType = adForm.querySelector('#type');
  var inputPrice = adForm.querySelector('#price');
  var selectRooms = adForm.querySelector('#room_number');
  var selectGuest = adForm.querySelector('#capacity');
  var checkin = adForm.querySelector('#timein');
  var checkout = adForm.querySelector('#timeout');

  var RADIX_NUMBER = 10;
  var NO_FOR_GUEST = 0;
  var ROOMS_100 = 100;

  // Модуль form
  var formElementDisabled = function (collectionElements) {
    for (var i = 0; i < collectionElements.length; i++) {
      collectionElements[i].disabled = true;
    }
  };

  var formElementEnabled = function (collectionElements) {
    for (var i = 0; i < collectionElements.length; i++) {
      collectionElements[i].disabled = false;
    }
  };

  var disableInterface = function () {
    formElementDisabled(formMapFilters.elements);
    formElementDisabled(adForm.elements);
  };

  var enableInterface = function () {
    formElementEnabled(formMapFilters.elements);
    formElementEnabled(adForm.elements);
  };

  disableInterface();

  var inputTitleValidationHandler = function () {
    if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity('Запишите название вашего лучшего жилья');
    } else if (inputTitle.validity.tooShort || inputTitle.validity.tooLong) {
      inputTitle.setCustomValidity('Заголовок состоит из минимально 30-ти символов или максимально из 100 символов');
    } else {
      inputTitle.setCustomValidity('');
    }
  };

  var selectTypeChangeHandler = function () {
    checkType();
  };

  var checkType = function () {
    var houseType = selectType.value;

    switch (houseType) {
      case 'palace':
        inputPrice.value = 10000;
        inputPrice.min = 10000;
        break;
      case 'flat':
        inputPrice.value = 1000;
        inputPrice.min = 1000;
        break;
      case 'house':
        inputPrice.value = 5000;
        inputPrice.min = 5000;
        break;
      case 'bungalo':
        inputPrice.value = 0;
        inputPrice.min = 0;
        break;
      default:
        inputPrice.value = 0;
        inputPrice.min = 0;
    }
  };

  var inputPriceValidationHandler = function () {
    if (inputPrice.validity.valueMissing) {
      inputPrice.setCustomValidity('Укажите цену');
    } else if (inputPrice.validity.min) {
      inputPrice.setCustomValidity('Введите значение не меньше' + inputPrice.min);
    } else if (inputPrice.validity.max) {
      inputPrice.setCustomValidity('Введите значение не больше 1000000');
    } else {
      inputPrice.setCustomValidity('');
    }
  };

  var selectRoomChangeHandler = function () {
    var rooms = parseInt(selectRooms.value, RADIX_NUMBER);
    var guests = parseInt(selectGuest.value, RADIX_NUMBER);

    if (rooms === ROOMS_100 && guests > NO_FOR_GUEST) {
      selectGuest.setCustomValidity('Для выбранного количества гостей размещение невозможно');
    } else if (guests > rooms && guests !== rooms) {
      selectGuest.setCustomValidity('Количество гостей больше или меньше чем комнат');
    } else {
      selectGuest.setCustomValidity('');
    }
  };

  var fieldsetTimeChangeHandler = function (evt) {
    if (evt.target.closest('#timein')) {
      checkout.selectedIndex = checkin.selectedIndex;
    } else if (evt.target.closest('#timeout')) {
      checkin.selectedIndex = checkout.selectedIndex;
    }
  };

  function logReset(evt) {
    console.log('lel');
  }


  var activateForm = function () {
    enableInterface();

    inputAddress.readOnly = true;

    recordAddressOnTipEnd(true);
    inputTitle.addEventListener('invalid', inputTitleValidationHandler);
    inputPrice.addEventListener('invalid', inputPriceValidationHandler);
    checkType();
    selectType.addEventListener('change', selectTypeChangeHandler);
    selectRooms.addEventListener('change', selectRoomChangeHandler);
    fieldsetTimes.addEventListener('change', fieldsetTimeChangeHandler);

    adForm.addEventListener('click', selectRoomChangeHandler);
    adForm.addEventListener('submit', adFormSubmitHandler);
    buttonReset.addEventListener('reset', logReset);
  };

  var cleanForm = function () {
    adForm.reset();
    disableInterface();
  };


  var recordAddressOnTipEnd = function (onTipEnd) {
    if (onTipEnd) {
      inputAddress.value = Math.floor(window.pins.mainPin.offsetTop + (window.pins.MAIN_PIN_WIDTH_ACTIVE / 2)) + ', ' + (window.pins.mainPin.offsetLeft + window.pins.MAIN_PIN_HEIGHT_ACTIVE);
    } else {
      inputAddress.value = Math.floor(window.pins.mainPin.offsetTop + window.pins.MAIN_PIN_WIDTH_INACTIVE / 2) + ', ' + Math.floor(window.pins.mainPin.offsetLeft + window.pins.MAIN_PIN_HEIGHT_INACTIVE / 2);
    }
  };

  var documentLoadHandler = function () {
    recordAddressOnTipEnd();
  };

  var formSubmitError = function (errorMessage) {
    window.state.renderStateElement(window.state.errorTemplate, window.state.main, errorMessage);
    window.state.addErrorListener();
  };

  var formSubmitSuccess = function () {
    window.map.deactivateMap();
    cleanForm();
    window.state.renderStateElement(window.state.successTemplate, window.state.main);
    window.state.addSuccessListener();
  };

  var adFormSubmitHandler = function (evt) {
    evt.preventDefault();
    window.backend.submit(new FormData(adForm), formSubmitSuccess, formSubmitError);
  };

  document.addEventListener('DOMContentLoaded', documentLoadHandler);

  window.form = {
    adForm: adForm,
    activateForm: activateForm,
    recordAddressOnTipEnd: recordAddressOnTipEnd
  };
})();
