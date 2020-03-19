// 'use strict';

// (function () {
// var MIN = 1;
// var MAX = 10;

// var MIN_PRICE = 0;
// var MAX_PRICE = 1000;

// var TYPES = ['palace', 'flat', 'house', 'bungalo'];
// var TIMES = ['12:00', '13:00', '14:00'];
// var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
// var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// var randomNumber = function (min, max) {
//   return Math.floor(min + Math.random() * (max + 1 - min));
// };

// var getRandomElementArray = function (array) {
//   var i = randomNumber(0, array.length - 1);
//   return array[i];
// };

// var getRandomArray = function (array) {
//   return array.slice(Math.floor(Math.random() * array.length - 1));
// };

// var createMocksData = function (count) {
//   var array = [];
//   for (var i = 0; i < count; i++) {
//     array.push({
//       'author': {
//         'avatar': 'img/avatars/user0' + (i + 1) + '.png',
//       },
//       'offer': {
//         'title': 'Заголовок объявления',
//         'address': '600, 350',
//         'price': randomNumber(MIN_PRICE, MAX_PRICE),
//         'type': getRandomElementArray(TYPES),
//         'rooms': randomNumber(MIN, MAX),
//         'guests': randomNumber(MIN, MAX),
//         'checkin': getRandomElementArray(TIMES),
//         'checkout': getRandomElementArray(TIMES),
//         'features': getRandomArray(FEATURES),
//         'description': 'Здесь подробное описание жилья',
//         'photos': getRandomArray(PHOTOS),
//         'id': i
//       },
//       'location': {
//         'x': randomNumber(MIN_MAP_WIDTH, MAX_MAP_WIDTH),
//         'y': randomNumber(MIN_MAP_HEIGHT, MAX_MAP_HEIGHT)
//       }
//     });
//   }
//   return array;
// };

// window.data = {
// mocks: createMocksData(8)
// };
// })();
