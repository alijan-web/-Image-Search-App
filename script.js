const accessKey = "vXMhwy3zNvAHaA7RMTXWvGOy6K-8HosLzA-Ep6CKBuU";
const searchForm = document.querySelector('form');
const imagesContainer = document.querySelector('.images-container');
const searchInput = document.querySelector('.search-input');

//Function to Fetch Images using Unsplish API
const fetchImages = async (query) => {
    imagesContainer.innerHTML = "";
   const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&client_id=${accessKey}`

   const response = await fetch(url);
   const data = await response.json();

//console.log(data);

// Creating Image Div
data.results.forEach(photo => {
    const imageElement = document.createElement('div');
    imageElement.classList.add('imageDiv');
    imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;

//Creating Overlay
    const overlayElement = document.createElement('div');
    overlayElement.classList.add('overlay');

// Creating Overlayb Text
    const overlayText = document.createElement('h3');
    overlayText.innerText = `${photo.alt_description}`

    imageElement.appendChild(overlayElement);
    imagesContainer.appendChild(imageElement);
    overlayElement.appendChild(overlayText)
});
}


// Adding Event Listener to Search Form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if(inputText !== ""){
        fetchImages(inputText)
    }else {
        imagesContainer.innerHTML = `<h2>Please enter a  search query.</h2>`
    }
})
