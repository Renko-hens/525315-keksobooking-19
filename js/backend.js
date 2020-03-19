'use strict';

(function () {
  var statusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    BAD_GATEWAY: 502
  };
  var TIMEOUT_IN_MS = 10000;

  var load = function (loadDataCallback, errorDataCallback) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.open('GET', URL);
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case statusCode.OK:
          loadDataCallback(xhr.response);
          break;
        case statusCode.BAD_REQUEST:
          errorDataCallback('Не могу обработать запрос. Проверьте пожалуйста данные и повторите попытку');
          break;
        case statusCode.NOT_FOUND:
          errorDataCallback('По вашему запросу ничего не найдено. Проверьте пожалуйста данные и повторите попытку');
          break;
        case statusCode.BAD_GATEWAY:
          errorDataCallback('Ошибка на стороне сервера. Мы пытаемся исправить это. Повторите попытку чуть позже :)');
          break;
        default:
          if (xhr.responceType !== 'json') {
            throw new Error('Неизвестный тип данных: ' + xhr.responceType);
          } else {
            errorDataCallback('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
          }
      }
    });

    xhr.addEventListener('error', function () {
      errorDataCallback('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.addEventListener('timeout', function () {
      errorDataCallback('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
