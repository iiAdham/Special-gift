// script.js

// Load audio files
var noSound = new Audio('no-sound.mp3'); // Sound when "No" is clicked
var yesSound = new Audio('yes-sound.mp3'); // Sound when "Yes" is clicked

// Function to handle button click events
function selectOption(option) {
    if (option === 'yes') {
        yesSound.play(); // Play "Yes" sound
        flashRainbowColors(function() {
            document.getElementById('question').style.display = 'none';
            displayCatHeart();
        });
    } else if (option === 'no') {
        noSound.play(); // Play "No" sound
        document.getElementById('no-button').innerText = 'SURE?'; 
        var yesButton = document.getElementById('yes-button');
        var currentFontSize = window.getComputedStyle(yesButton).getPropertyValue('font-size');
        var newSize = parseFloat(currentFontSize) * 2;
        yesButton.style.fontSize = newSize + 'px';
    } else {
        alert('Invalid option!');
    }
}

// Function to flash rainbow colors and then execute a callback function
function flashRainbowColors(callback) {
    var colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
    var i = 0;
    var interval = setInterval(function() {
        document.body.style.backgroundColor = colors[i];
        i = (i + 1) % colors.length;
    }, 200); // Change color every 200 milliseconds
    setTimeout(function() {
        clearInterval(interval);
        document.body.style.backgroundColor = ''; // Reset background color
        if (callback) {
            callback();
        }
    }, 2000); // Flash colors for 2 seconds
}

// Function to display the cat.gif initially
function displayCat() {
    // Get the container where the image will be displayed
    var imageContainer = document.getElementById('image-container');
    // Create a new Image element for the cat
    var catImage = new Image();
    // Set the source (file path) for the cat image
    catImage.src = 'cat.gif'; // Assuming the cat image is named "cat.gif"
    // Set alternative text for the image (for accessibility)
    catImage.alt = 'Cat';
    // When the cat image is fully loaded, add it to the image container
    catImage.onload = function() {
        imageContainer.appendChild(catImage);
    };
}

// Function to display the cat-heart.gif
function displayCatHeart() {
    // Clear existing content in the image container
    document.getElementById('image-container').innerHTML = '';
    // Get the container where the image will be displayed
    var imageContainer = document.getElementById('image-container');
    // Create a new Image element for the cat-heart
    var catHeartImage = new Image();
    // Set the source (file path) for the cat-heart image
    catHeartImage.src = 'cat-heart.gif'; // Assuming the cat-heart image is named "cat-heart.gif"
    // Set alternative text for the image (for accessibility)
    catHeartImage.alt = 'Cat Heart';
    // When the cat-heart image is fully loaded, add it to the image container
    catHeartImage.onload = function() {
        imageContainer.appendChild(catHeartImage);
        // Hide the options container
        document.getElementById('options').style.display = 'none';
    };
}

// Display the cat.gif initially
displayCat();

let images = document.querySelectorAll(".gallery-image");
let currentIndex = 0;
let startX = 0;
let isDragging = false;

document.getElementById("image-gallery").addEventListener("mousedown", (event) => {
    isDragging = true;
    startX = event.clientX;
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

document.addEventListener("mousemove", (event) => {
    if (!isDragging) return;
    
    let diff = event.clientX - startX;

    if (diff > 50) {
        showPreviousImage();
        isDragging = false;
    } else if (diff < -50) {
        showNextImage();
        isDragging = false;
    }
});

function showNextImage() {
    images[currentIndex].style.transform = "translateX(-100%)";
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].style.transform = "translateX(0)";
}

function showPreviousImage() {
    images[currentIndex].style.transform = "translateX(100%)";
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    images[currentIndex].style.transform = "translateX(0)";
}
