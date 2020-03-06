'use strict';
(function () {

  var POPUP_PHOTO_WIDTH = 45;
  var POPUP_PHOTO_HEIGHT = 40;

  // Модуль Карточки
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

  window.card.renderCard = renderCard;
})();
