const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let loadedImage = 0;
let totalImage = 0;
let photoArray = [];
let count = 5;

const apiKey = 'CMmL4N9LIaTl2M8wyoeoCa-k8fJF4LOLHSEuPu77M-A';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// helper function for setAttribute
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
function imageLoaded() {
    console.log('loaded image');
    loadedImage++;
    if (loadedImage === totalImage) {
        ready = true;
        count = 30;
        loader.hidden = true;
    }
}
// get photos from unsplash api
function displayImages() {
    loadedImage = 0;
    totalImage = photoArray.length;
    photoArray.forEach((photo) => {
        // create a elment
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // create img element
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        img.addEventListener('load', imageLoaded)

        // add img into a  element
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}

async function getPhotos() {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayImages();
    console.log(data);

}

// check to see scrolling near to bottom
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && ready) {
        ready = false;
        getPhotos();
    }
})


getPhotos();