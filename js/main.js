'use strict';

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var map = document.querySelector('.map');
var mapPinsContainer = map.querySelector('.map__pins');
var mainPin = document.querySelector('.map__pin--main');
var formMapFilters = map.querySelector('.map__filters');
var adForm = document.querySelector('.ad-form');

var inputTitle = adForm.querySelector('#title');
var inputAddress = adForm.querySelector('#address');
var selectType = adForm.querySelector('#type');
var inputPrice = adForm.querySelector('#price');
var selectRooms = adForm.querySelector('#room_number');
var selectGuest = adForm.querySelector('#capacity');
var fieldsetTimes = adForm.querySelector('.ad-form__element--time');
var checkin = adForm.querySelector('#timein');
var checkout = adForm.querySelector('#timeout');

var PIN_WIDTH = mainPin.offsetWidth;
var PIN_HEIGHT = mainPin.offsetHeight;

var mainPinPositionX = mainPin.offsetTop;
var mainPinPositionY = mainPin.offsetLeft;

var MIN = 1;
var MAX = 10;

var MIN_PRICE = 0;
var MAX_PRICE = 1000;

var MIN_MAP_WIDTH = 0;
var MAX_MAP_WIDTH = 1200;
var MIN_MAP_HEIGHT = 130;
var MAX_MAP_HEIGHT = 630;

var POPUP_PHOTO_WIDTH = 45;
var POPUP_PHOTO_HEIGHT = 40;

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var ENTER_BUTTON = 'Enter';
var ESC_BUTTON = 'Escape';
var LEFT_BUTTON_MOUSE = 0;

var RADIX_NUMBER = 10;
var NO_FOR_GUEST = 0;
var ROOMS_100 = 100;

var randomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomElementArray = function (array) {
  var i = randomNumber(0, array.length - 1);
  return array[i];
};

var getRandomArray = function (array) {
  return array.slice(Math.floor(Math.random() * array.length - 1));
};

var createMocksData = function (count) {
  var array = [];
  for (var i = 0; i < count; i++) {
    array.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
      },
      'offer': {
        'title': 'Заголовок объявления',
        'address': '600, 350',
        'price': randomNumber(MIN_PRICE, MAX_PRICE),
        'type': getRandomElementArray(TYPES),
        'rooms': randomNumber(MIN, MAX),
        'guests': randomNumber(MIN, MAX),
        'checkin': getRandomElementArray(TIMES),
        'checkout': getRandomElementArray(TIMES),
        'features': getRandomArray(FEATURES),
        'description': 'Здесь подробное описание жилья',
        'photos': getRandomArray(PHOTOS),
        'id': i
      },
      'location': {
        'x': randomNumber(MIN_MAP_WIDTH, MAX_MAP_WIDTH),
        'y': randomNumber(MIN_MAP_HEIGHT, MAX_MAP_HEIGHT)
      }
    });
  }
  return array;
};

var mocks = createMocksData(8);

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

var getHouseType = function (type) {
  var houseType;
  switch (type) {
    case 'palace':
      houseType = 'Дворец';
      break;
    case 'flat':
      houseType = 'Квартира';
      break;
    case 'house':
      houseType = 'Дом';
      break;
    case 'bungalo':
      houseType = 'Бунгало';
      break;
    default:
      houseType = 'Тип жилья не указан';
  }
  return houseType;
};

var createFeatureElements = function (featuresDataList) {
  var featuresFragment = document.createDocumentFragment();
  for (var i = 0; i < featuresDataList.length; i++) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature', 'popup__feature--' + featuresDataList[i]);
    featuresFragment.appendChild(feature);
  }
  return featuresFragment;
};

var createImageElements = function (imagesDataList) {
  var imagesFragment = document.createDocumentFragment();

  for (var i = 0; i < imagesDataList.length; i++) {
    var image = document.createElement('img');
    image.classList.add('popup__photo');
    image.src = imagesDataList[i];
    image.style.width = POPUP_PHOTO_WIDTH + 'px';
    image.style.height = POPUP_PHOTO_HEIGHT + 'px';
    imagesFragment.appendChild(image);
  }
  return imagesFragment;
};

var createCard = function (data, template) {
  var card = template.cloneNode(true);
  var offer = data.offer;
  var author = data.author;
  var featureListContainer = card.querySelector('.popup__features');
  var featureElements = createFeatureElements(offer.features);
  var imagesListContainer = card.querySelector('.popup__photos');
  var imagesElements = createImageElements(offer.photos);

  card.classList.add('hidden');
  card.setAttribute('data-card-id', data.offer.id);

  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = getHouseType(offer.type);
  card.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнат для ' + offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  card.querySelector('.popup__description').textContent = offer.description;

  featureListContainer.innerHTML = '';
  featureListContainer.appendChild(featureElements);

  imagesListContainer.innerHTML = '';
  imagesListContainer.appendChild(imagesElements);

  return card;
};

var renderCard = function (arrayData, sibling, template) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrayData.length; i++) {
    fragment.appendChild(createCard(arrayData[i], template));
  }
  sibling.after(fragment);
};

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

var mapClickHandler = function (evt) {
  var targetPin = evt.target.closest('.map__pin');
  var mapCards = map.querySelectorAll('.map__card');
  var buttonClose = evt.target.closest('.popup__close');
  var mapCard = evt.target.closest('.map__card');

  if (buttonClose && !mapCard.classList.contains('hidden')) {
    mapCard.classList.add('hidden');
  }

  if (targetPin && !targetPin.classList.contains('map__pin--main')) {
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
  var targetPin = evt.target.closest('.map__pin');
  var mapCards = map.querySelectorAll('.map__card');
  var buttonClose = evt.target.closest('.popup__close');
  var mapCard = evt.target.closest('.map__card');

  if (buttonClose && evt.key === ENTER_BUTTON && !mapCard.classList.contains('hidden')) {
    mapCard.classList.add('hidden');
  }

  if (evt.key === ENTER_BUTTON && targetPin || evt.key === ESC_BUTTON) {
    mapCards.forEach(function (card) {
      if (card.classList.contains('hidden') && targetPin.dataset.pinId === card.dataset.cardId) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }
};

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
      houseType = 'Квартира';
      break;
    case 'house':
      inputPrice.value = 5000;
      inputPrice.min = 5000;
      houseType = 'Дом';
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

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  renderCard(mocks, mapPinsContainer, cardTemplate);
  renderPin(mocks, mapPinsContainer, pinTemplate);
  enableInterface();

  inputAddress.disabled = true;
  inputAddress.value = Math.floor(mainPinPositionX + (PIN_WIDTH / 2)) + ', ' + (mainPinPositionY + PIN_HEIGHT);

  inputTitle.addEventListener('invalid', inputTitleValidationHandler);
  inputPrice.addEventListener('invalid', inputPriceValidationHandler);
  checkType();
  selectType.addEventListener('change', selectTypeChangeHandler);
  selectRooms.addEventListener('change', selectRoomChangeHandler);
  fieldsetTimes.addEventListener('change', fieldsetTimeChangeHandler);

  adForm.addEventListener('click', selectRoomChangeHandler);
  map.addEventListener('mousedown', mapClickHandler);
  map.addEventListener('keydown', mapPressHandler);
};

var pinPressHandler = function (evt) {
  if (evt.button === LEFT_BUTTON_MOUSE || evt.key === ENTER_BUTTON) {
    activatePage();
  }
};

var documentLoadHandler = function () {
  inputAddress.value = Math.floor(mainPinPositionX + PIN_WIDTH / 2) + ', ' + Math.floor(mainPinPositionY + PIN_HEIGHT / 2);
};

mainPin.addEventListener('mousedown', pinPressHandler);
mainPin.addEventListener('keydown', pinPressHandler);
document.addEventListener('DOMContentLoaded', documentLoadHandler);

