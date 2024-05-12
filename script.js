const accessKey = "vXMhwy3zNvAHaA7RMTXWvGOy6K-8HosLzA-Ep6CKBuU";
const searchForm = document.querySelector('form');
const imagesContainer = document.querySelector('.images-container');
const searchInput = document.querySelector('.search-input');
const lodeMoreBtn = document.querySelector('.lodeMoreBtn');

let page = 1;

//Function to Fetch Images using Unsplish API
const fetchImages = async (query, pageNo) => {
    try {

    if (pageNo === 1) {
        imagesContainer.innerHTML = "";
    }

    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`

    const response = await fetch(url);
    const data = await response.json();

if(data.results.length > 0){
    
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

    if (data.total_pages === pageNo) {
        lodeMoreBtn.style.display = "none";
    } else {
        lodeMoreBtn.style.display = "block";
    }
}
else {
    imagesContainer.innerHTML = `<h2>No Image Found</h2>`
}
} catch (error) {
    imagesContainer.innerHTML = `<h2>Failed to Fetch Images. Please try again later</h2>`
}
}

// Adding Event Listener to Search Form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if (inputText !== "") {
        page = 1;
        fetchImages(inputText, page)
    } else {
        imagesContainer.innerHTML = `<h2>Please enter a  search query.</h2>`
        if(lodeMoreBtn.style.display === "block"){
              lodeMoreBtn.style.display = "none";
        }
    }
})

// Adding Event Listener Lode more button to fetch more Images
lodeMoreBtn.addEventListener('click', () => {
    fetchImages(searchInput.value.trim(), ++page);
})