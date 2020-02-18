'use strict';

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
// var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mainPin = document.querySelector('.map__pin--main');
var formMapFilters = map.querySelector('.map__filters');
var adForm = document.querySelector('.ad-form');
var inputAddress = adForm.querySelector('#address');
var selectRooms = adForm.querySelector('#room_number');
var selectCapacity = adForm.querySelector('#capacity');

var RADIX_NUMBER = 10;

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

// var POPUP_PHOTO_WIDTH = 45;
// var POPUP_PHOTO_HEIGHT = 40;

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var ENTER_BUTTON = 'Enter';
var LEFT_BUTTON_MOUSE = 0;

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
        'photos': getRandomArray(PHOTOS)
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

// var getHouseType = function (type) {
//   var houseType;
//   switch (type) {
//     case 'palace':
//       houseType = 'Дворец';
//       break;
//     case 'flat':
//       houseType = 'Квартира';
//       break;
//     case 'house':
//       houseType = 'Дом';
//       break;
//     case 'bungalo':
//       houseType = 'Бунгало';
//       break;
//     default:
//       houseType = 'Тип жилья не указан';
//   }
//   return houseType;
// };

// var createFeatureElements = function (featuresDataList) {
//   var featuresFragment = document.createDocumentFragment();
//   for (var i = 0; i < featuresDataList.length; i++) {
//     var feature = document.createElement('li');
//     feature.classList.add('popup__feature', 'popup__feature--' + featuresDataList[i]);
//     featuresFragment.appendChild(feature);
//   }
//   return featuresFragment;
// };

// var createImageElements = function (imagesDataList) {
//   var imagesFragment = document.createDocumentFragment();

//   for (var i = 0; i < imagesDataList.length; i++) {
//     var image = document.createElement('img');
//     image.classList.add('popup__photo');
//     image.src = imagesDataList[i];
//     image.style.width = POPUP_PHOTO_WIDTH + 'px';
//     image.style.height = POPUP_PHOTO_HEIGHT + 'px';
//     imagesFragment.appendChild(image);
//   }
//   return imagesFragment;
// };

// var createCard = function (data, template) {
//   var card = template.cloneNode(true);
//   var offer = data.offer;
//   var author = data.author;
//   var featureListContainer = card.querySelector('.popup__features');
//   var featureElements = createFeatureElements(offer.features);
//   var imagesListContainer = card.querySelector('.popup__photos');
//   var imagesElements = createImageElements(offer.photos);

//   card.querySelector('.popup__avatar').src = author.avatar;
//   card.querySelector('.popup__title').textContent = offer.title;
//   card.querySelector('.popup__text--address').textContent = offer.address;
//   card.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
//   card.querySelector('.popup__type').textContent = getHouseType(offer.type);
//   card.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнат для ' + offer.guests + ' гостей';
//   card.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
//   card.querySelector('.popup__description').textContent = offer.description;

//   featureListContainer.innerHTML = '';
//   featureListContainer.appendChild(featureElements);

//   imagesListContainer.innerHTML = '';
//   imagesListContainer.appendChild(imagesElements);

//   return card;
// };

// var renderCard = function (arrayData, sibling, template) {
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < arrayData.length; i++) {
//     fragment.appendChild(createCard(arrayData[i], template));
//   }
//   sibling.after(fragment);
// };

// renderCard(mocks, mapPins, cardTemplate);

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

var selectChangeHandler = function () {
  var numberValueSelectRoom = parseInt(selectRooms.value, RADIX_NUMBER);
  var numberValueSelectCapacity = parseInt(selectCapacity.value, RADIX_NUMBER);

  if (numberValueSelectRoom < numberValueSelectCapacity && numberValueSelectRoom !== numberValueSelectCapacity) {
    selectRooms.setCustomValidity('Количество комнат меньше чем количество мест');
    selectCapacity.setCustomValidity('Количество комнат меньше чем количество мест');
  } else {
    selectRooms.setCustomValidity('');
    selectCapacity.setCustomValidity('');
  }
};

var activatePage = function () {
  map.classList.remove('map--faded');
  renderPin(mocks, mapPins, pinTemplate);
  inputAddress.value = Math.floor(mainPinPositionX + (PIN_WIDTH / 2)) + ', ' + (mainPinPositionY + PIN_HEIGHT);
  selectRooms.addEventListener('change', selectChangeHandler);
  selectCapacity.addEventListener('change', selectChangeHandler);
  adForm.addEventListener('click', selectChangeHandler);
  adForm.classList.remove('ad-form--disabled');
  enableInterface();
};

var pinPressHandler = function (evt) {
  if (evt.button === LEFT_BUTTON_MOUSE || evt.key === ENTER_BUTTON) {
    activatePage();
  }
};

var documentLoadHandler = function () {
  inputAddress.value = Math.floor(mainPinPositionX + PIN_WIDTH / 2) + ', ' + mainPinPositionY;
};

mainPin.addEventListener('mousedown', pinPressHandler);
mainPin.addEventListener('keydown', pinPressHandler);
document.addEventListener('DOMContentLoaded', documentLoadHandler);
