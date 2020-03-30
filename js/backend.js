'use strict';

(function () {
  var buttonSubmit = document.querySelector('.ad-form__submit');
  var statusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
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
      errorDataCallback('Ошибка соединения. Проверьте Ваше подключение к интернету');
    });

    xhr.addEventListener('timeout', function () {
      errorDataCallback('Запрос не успел выполниться за ' + xhr.timeout + 'мс. Проверьте Ваше подключение к интернету');
    });

    xhr.send();
  };

  var submit = function (data, loadSuccessCallback, errorDataCallback) {
    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('POST', URL);

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case statusCode.OK:
          loadSuccessCallback();
          buttonSubmit.textContent = 'Сохранить';
          buttonSubmit.disabled = false;
          break;
        case statusCode.SERVER_ERROR:
          errorDataCallback('Не могу отправить данные. ' + xhr.statusText + 'Проверьте подключение к интернету.');
          break;
        case statusCode.BAD_REQUEST:
          errorDataCallback('Не могу отправить данные. ' + xhr.statusText);
          break;
        case statusCode.BAD_GATEWAY:
          errorDataCallback('Нет ответа от сервера. Мы пытаемся исправить это. Повторите попытку чуть позже :) ' + xhr.statusText);
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
      errorDataCallback(xhr.response);
    });

    xhr.addEventListener('timeout', function () {
      errorDataCallback(xhr.response);
    });

    buttonSubmit.textContent = 'Сохраняю...';
    buttonSubmit.disabled = true;

    xhr.send(data);
  };

  window.backend = {
    load: load,
    submit: submit
  };
})();
