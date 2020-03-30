'use strict';

(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var ESC_BUTTON = 'Escape';

  var createStateElement = function (template, messageError) {
    var stateElement = template.cloneNode(true);

    if (messageError !== undefined) {
      stateElement.querySelector('.error__message').textContent = messageError;
    }

    return stateElement;
  };


  var renderStateElement = function (template, parent, messageError) {
    var fragment = document.createDocumentFragment();

    if (messageError !== undefined) {
      fragment.appendChild(createStateElement(template, messageError));
    } else {
      fragment.appendChild(createStateElement(template));
    }

    parent.appendChild(fragment);
    // Здесь работает, но это ошибка
    addErrorListener();
  };

  var removeErrorBanner = function (evt) {
    var error = main.querySelector('.error');
    var errorButton = evt.target.closest('.error__button');

    if (evt.key === ESC_BUTTON) {
      error.remove();
    } else if (evt.target.closest('.error') !== null || errorButton !== null) {
      error.remove();
    }

    error.removeEventListener('click', removeErrorBanner);
    window.removeEventListener('keydown', removeErrorBanner);
  };

  var addErrorListener = function () {
    var error = main.querySelector('.error');
    error.addEventListener('click', removeErrorBanner);
    window.addEventListener('keydown', removeErrorBanner);
  };

  var removeSuccessBanner = function (evt) {
    var success = main.querySelector('.success');

    if (evt.key === ESC_BUTTON) {
      success.remove();
    } else if (evt.target.closest('.success') !== null) {
      success.remove();
    }

    success.removeEventListener('click', removeSuccessBanner);
    window.removeEventListener('keydown', removeSuccessBanner);
  };

  var addSuccessListener = function () {
    var success = main.querySelector('.success');

    success.addEventListener('click', removeSuccessBanner);
    window.addEventListener('keydown', removeSuccessBanner);
  };

  window.state = {
    renderStateElement: renderStateElement,
    addSuccessListener: addSuccessListener,
    addErrorListener: addErrorListener,
    successTemplate: successTemplate,
    errorTemplate: errorTemplate,
    main: main
  };

})();
