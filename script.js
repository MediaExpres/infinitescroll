import { apiKey } from "./config.js";

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API

const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Create Elements For Links & Photos, and add that to the DOM

function displayPhotos() {
    // Run for each object in photosArray
    photosArray.forEach((photo) => {
      // create <a></a> element to link to Unsplash
      const item = document.createElement('a');
      item.setAttribute('href', photo.links.html);  //.links.html could be seen in the array that comes from the Unsplash!
      item.setAttribute('target', '_blank' );

      // create <img> for photo
      const img = document.createElement('img');
      img.setAttribute('src', photo.urls.regular); //.urls.regular could be seen in the array that comes from the Unsplash!
      img.setAttribute('alt', photo.alt_description); // .alt_description could be seen in the array that comes from the Unsplash!
      img.setAttribute('title', photo.alt_description);

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


// On Load

getPhotos();