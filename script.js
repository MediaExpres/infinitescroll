import { apiKey } from "./config.js";

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API

const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;



// Get photos from Unsplash API 

async function getPhotos() {
    try {
const response = await fetch(apiUrl);
photosArray = await response.json();
console.log(photosArray);

    } catch (error) {
        // Catch error here
    }
}


// On Load

getPhotos();