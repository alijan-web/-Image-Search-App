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

//    console.log(data);

data.results.forEach(photo => {
    const imageElement = document.createElement('div');
    imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;

    imagesContainer.appendChild(imageElement);
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
