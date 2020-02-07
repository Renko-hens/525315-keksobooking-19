'use strict';

var MIN = 1;
var MAX = 10;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

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

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapPins = document.querySelector('.map__pins');

var randomNumber = function (min, max) {
  var number = 0;
  if (min >= 0 && max) {
    // Максимум и минимум работают.
    number = Math.floor(min + Math.random() * (max + 1 - min));
  } else {
    // Рандомное число до 999
    number = Math.floor(Math.random() * 10000);
  }
  return number;
};

var getRandomElementArray = function (quantity) {
  var i = randomNumber(0, quantity.length - 1);
  return quantity[i];
};

var getRandomArray = function (array) {
  var newArray = array.slice(Math.floor(Math.random() * array.length - 1));
  return newArray;
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
        'address': 'location.x, location.y',
        'price': randomNumber(),
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

// Записываю массив в переменную для обращения к нему.
var mocks = createMocksData(8);

// Создаем функцию для создания отметки с данными по шаблону для копирования.
var createPin = function (objData, template) {
  var element = template.cloneNode(true);
  element.style.cssText = 'left: ' + (objData.location.x - (PIN_WIDTH / 2)) + 'px;' + 'top: ' + (objData.location.y - (PIN_HEIGHT / 2)) + 'px;';
  element.querySelector('img').src = objData.author.avatar;
  element.querySelector('img').alt = objData.offer.title;
  return element;
};

// Добавляем на страницу отметку с массивом данных и вставкой в блок.
var renderPin = function (arrayData, parent) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrayData.length; i++) {
    fragment.appendChild(createPin(arrayData[i], pinTemplate));
  }
  parent.appendChild(fragment);
};

renderPin(mocks, mapPins);

var choiceHousingType = function (type) {
  var typeHouse;
  if (type === 'palace') {
    typeHouse = 'Дворец';
  } else if (type === 'flat') {
    typeHouse = 'Квартира';
  } else if (type === 'house') {
    typeHouse = 'Дом';
  } else if (type === 'bungalo') {
    typeHouse = 'Бунгало';
  }
  return typeHouse;
};

var createFeatureElements = function (array) {
  var arrayFeatures = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] === 'wifi' || array[i] === 'dishwasher' || array[i] === 'washer' || array[i] === 'parking' || array[i] === 'elevator' || array[i] === 'conditioner') {
      arrayFeatures[i] = document.createElement('li');
      arrayFeatures[i].classList.add('popup__feature', 'popup__feature--' + array[i]);
      arrayFeatures.push(arrayFeatures[i]);
    }
  }
  return arrayFeatures;
};

var createImageElements = function (array) {
  var arrayImages = [];
  for (var i = 0; i < array.length; i++) {
    arrayImages[i] = document.createElement('img');
    arrayImages[i].classList.add('popup__photo');
    arrayImages[i].src = array[i];
    arrayImages[i].width = POPUP_PHOTO_WIDTH;
    arrayImages[i].height = POPUP_PHOTO_HEIGHT;
    arrayImages.push(arrayImages[i]);
  }
  return arrayImages;
};

var createCard = function (objData, template) {
  var offer = objData.offer;
  var author = objData.author;
  var element = template.cloneNode(true);
  var featureList = element.querySelector('.popup__features');
  var arrayFeatureElements = createFeatureElements(offer.features);
  var imagesList = element.querySelector('.popup__photos');
  var arrayImagesElements = createImageElements(offer.photos);

  element.querySelector('.popup__avatar').src = author.avatar;
  element.querySelector('.popup__title').textContent = offer.title;
  element.querySelector('.popup__text--address').textContent = offer.address;
  element.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
  element.querySelector('.popup__type').textContent = choiceHousingType(offer.type);
  element.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнат для ' + offer.guests + ' гостей';
  element.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

  featureList.innerHTML = '';
  for (var i = 0; i < arrayFeatureElements.length; i++) {
    featureList.appendChild(arrayFeatureElements[i]);
  }

  element.querySelector('.popup__description').textContent = offer.description;

  imagesList.innerHTML = '';
  for (var j = 0; j < arrayImagesElements.length; j++) {
    imagesList.appendChild(arrayImagesElements[j]);
  }

  return element;
};

var renderCard = function (arrayData, element) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrayData.length; i++) {
    fragment.appendChild(createCard(arrayData[i], cardTemplate));
  }
  element.after(fragment);
};

renderCard(mocks, mapPins);
document.querySelector('.map').classList.remove('map--faded');
