'use strict';

const INDEX_SEARCH_KEY = 'current_image'

const images = [
  "http://komotoz.ru/kartinki/images/kartinki_s_serdechkami/kartinki_s_serdechkami_06.jpg",
  "https://lh5.googleusercontent.com/proxy/2kbgLQkQyH3P6OwYwjHbjdv-hVVSGrhedIQyj5Drt3z7NG9pdiWJjuvaHEjdL3Ca1br5_nCEbwkzybv3bA=s0-d",
  "http://pikstok.ru/images/images/1528372927887.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOf9VxgidnpZ-uYqYzacvG43JqcakqQBMGExu8y2A25wwJbo6g&s"
];

let currentIndex = 0;

const [prevButton, nextButton] = document.querySelectorAll('button');
const slideContainer = document.querySelector('.slideContainer');

nextButton.onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateImage();
};

prevButton.onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImage();
};

function updateImage () {
  const image = new Image();
  image.onload = onImageLoad;
  image.src = images[currentIndex];
  updateUrl ();
}

function onImageLoad () {
  if ((this.width / this.height) > (16 / 9)){
    this.style.width = `${slideContainer.clientHeight}px`;
  }else {
    this.style.height = `${slideContainer.clientHeight}px`;

  }
  slideContainer.innerHTML = '';
  slideContainer.appendChild(this);
}

window.onload = function () {
  let params = new URLSearchParams(location.search);
  if(params.has(INDEX_SEARCH_KEY)){
    currentIndex = params.get(INDEX_SEARCH_KEY);
  }
  updateImage();
};

function updateUrl () {
  history.replaceState(null,null,`?${INDEX_SEARCH_KEY}=${currentIndex}`);
}