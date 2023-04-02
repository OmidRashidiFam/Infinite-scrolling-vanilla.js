// ********** selecting elements
const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

// ********** global variables
let photosArray = [];
let ready = false;
let imagesloaded = 0;
let totalimages = 0;

// ********** helper functions
// ***** set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// ***** check if all images were loaded
function imageLoaded() {
  imagesloaded++;
  if (imagesloaded === totalimages) {
    loader.hidden = true; // hide loader after page loaded
    ready = true;
  }
}

// ********** unsplash API
const count = 20;
const apiKey = 'wCsFAi0ptbai9m60FLbnBRETn-0KypRW9cglMVww-_k';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
// ***** get information from API
async function getPhotos() {

  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (err) {
    console.log(err);
  }
}

// ********** creating elements, and adding them to the DOM
function displayPhotos() {
  console.log('loading....');
  imagesloaded = 0
  totalimages = photosArray.length;

  photosArray.forEach((photo) => {
    // ***** create <a> for link unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // ***** create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // ***** check when img is finished loading
    img.addEventListener('load', imageLoaded())
    // put <img> inside <a>, then put <img> inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  })
}

// ********** infinite scroll futer
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2000 && ready) {
    getPhotos();
    ready = false;
  }
})

// ********** onload
getPhotos();