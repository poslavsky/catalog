'use strict';
(function() {
var template = document.querySelector('template');
var container = document.querySelector('.catalog');
var pictures = [];

function renderPictures(picturesArray) {
  container.innerHTML = '';
  var fragment = document.createDocumentFragment();
  picturesArray.forEach(function(picture) {
    var element = getElementFromTemplate(picture);
    fragment.appendChild(element);
  });
  container.appendChild(fragment);
}


function getPictures() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '//home/mp/DEV/skorsky/src/content.json');
    xhr.onloadstart = function() {
      container.classList.add('pictures-loading');
    };
    xhr.onload = function(e) {
      container.classList.remove('pictures-loading');
      var rawData = e.target.response;
      var loadedPictures = JSON.parse(rawData);
      pictures = loadedPictures;
      renderPictures(loadedPictures);
    };

    xhr.send();
    xhr.onerror = function() {
      container.classList.add('pictures-failure');
    };
    xhr.timeout = 10000;
    xhr.ontimeout = function() {
      container.classList.add('pictures-failure');
    };
  }
getPictures();
function getElementFromTemplate(data) {
    var element;
    if ('content' in template) {
      element = template.content.childNodes[1].cloneNode(true);
    } else {
      element = template.children[0].cloneNode(true);
    }
    element.querySelector('.catalog__card-price').textContent = data.price;
    element.querySelector('.catalog__card-item--year').textContent = data.brend;


    var backgroundImage = new Image(182, 182);
    var templateImg = element.querySelector('img');
    var imageLoadTimeout;

    backgroundImage.onload = function() {
      clearTimeout(imageLoadTimeout);
      //можно сделать и фоном: element.style.backgroundImage = 'url(\'' + backgroundImage.src + '\')';
      element.replaceChild(backgroundImage, templateImg);
    };

    backgroundImage.onerror = function() {
      element.classList.add('picture-load-failure');
    };
    backgroundImage.src = data.url;

    var IMAGE_TIMEOUT = 10000;

    imageLoadTimeout = setTimeout(function() {
      backgroundImage.src = '';
      element.classList.add('picture-load-failure');
    }, IMAGE_TIMEOUT);

    return element;
  }
})();
