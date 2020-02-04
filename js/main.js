'use strict';

var MIN = 1;
var MAX = 10;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var MIN_MAP_WIDTH = 0;
var MAX_MAP_WIDTH = 1200;
var MIN_MAP_HEIGHT = 130;
var MAX_MAP_HEIGHT = 630;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

var randomNumber = function (min, max) {
  var number = 0;
  if (min >= 0 && max) {
    // Максимум и минимум работают.
    number = Math.floor(min + Math.random() * (max + 1 - min));
  } else {
    // Рандомное число до 999
    number = Math.floor(Math.random() * 1000);
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
        'description': 'Пустое описание',
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
var createPin = function (arrayData, template) {
  var element = template.cloneNode(true);
  element.style.cssText = 'left: ' + (arrayData.location.x + (-PIN_WIDTH / 2)) + 'px;' + 'top: ' + (arrayData.location.y + (-PIN_HEIGHT / 2)) + 'px;';
  element.querySelector('img').src = arrayData.author.avatar;
  element.querySelector('img').alt = arrayData.offer.title;
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
document.querySelector('.map').classList.remove('map--faded');
