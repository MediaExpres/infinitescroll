import { apiKey } from "../ccconfig.js";

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API

const count = 30;
// const apiKey = 'API_KEY':
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images loaded
function imageLoaded() {
    imagesLoaded++; // images increase by one
//    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
//      console.log('ready =', ready);
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
 
// Create Elements For Links & Photos, and add that to the DOM

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length; 
//    console.log('total images: ', totalImages);

    // Run for each object in photosArray
    photosArray.forEach((photo) => {
      // create <a></a> element to link to Unsplash
      const item = document.createElement('a');
    //   item.setAttribute('href', photo.links.html);  //.links.html could be seen in the array that comes from the Unsplash!
    //   item.setAttribute('target', '_blank' );
setAttributes(item, {
    href: photo.links.html,
    target: '_blank'
});
      // create <img> for photo
      const img = document.createElement('img');
    //   img.setAttribute('src', photo.urls.regular); //.urls.regular could be seen in the array that comes from the Unsplash!
    //   img.setAttribute('alt', photo.alt_description); // .alt_description could be seen in the array that comes from the Unsplash!
    //   img.setAttribute('title', photo.alt_description);

    setAttributes (img, {
src: photo.urls.regular,
alt: photo.alt_description,
title: photo.alt_description,
    });
// event listener, check when first 10 finished loading

img.addEventListener('load', imageLoaded);

      // put <img> inside <a></a> and then put both inside imageContainer 
      item.appendChild(img);
      imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API 

async function getPhotos() {
    try {
const response = await fetch(apiUrl);
photosArray = await response.json();
displayPhotos();

    } catch (error) {
        // Catch error here
    }
}

// check if scroll is near bottom of the page, load more photos
window.addEventListener('scroll', () => {
// console.log('scrolled'); - shows me a number of total until reaching the bottom, mine was 250
if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
//    the following console logs allows you to calculate the size of scrolling down and when to trigger the getPhotos()
    // console.log('window.innerHeight: ', window.innerHeight);
    // console.log('window.scrollY: ', window.scrollY);
    // console.log('window.innerHeight+scrollY: ', window.innerHeight + window.scrollY);
    // console.log('document.body.offsetHeight - 1000: ', document.body.offsetHeight - 1000);
    // console.log('load more');
    ready = false;
    getPhotos();
//    console.log('load more');
}
});

// On Load

getPhotos();