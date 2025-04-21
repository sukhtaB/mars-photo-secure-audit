// API Key and Base URL for NASA's Mars Rover Photos API
const apiKey = "oP5bENawFdm2BgUhBToX8Efg0lMJqSXqhZPEAw2M";
const baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";

// Fetches Mars Rover photos from NASA's API for a given Earth date.
async function fetchPhotos(date) { 
  try {
    const response = await fetch(`${baseUrl}?earth_date=${date}&api_key=${apiKey}`);
    if (!response.ok) throw new Error("Failed to fetch photos");

    const data = await response.json();
    return data.photos.slice(0, 3); // Return first three photos
  } catch (error) {
    console.error(error);
    displayError("Could not load Mars photos. Please try again.");
  }
}

// Displays an error message on the webpage
function displayError(message) {
  const errorDiv = document.getElementById("error");
  errorDiv.textContent = message;
}

// Loads initial photos from a significant Mars Rover date
async function loadInitialPhotos() {
  const significantDate = "2013-04-04"; // Date during a significant Mars event
  const photos = await fetchPhotos(significantDate);
  displayPhotos(photos, `Photos from Mars on: ${significantDate}`);
}

// Event listener for the Load Photos button click
document.getElementById("load-button").addEventListener("click", async () => {
  const date = document.getElementById("date-input").value;
  if (date) {
    const photos = await fetchPhotos(date);
    displayPhotos(photos, `Photos from ${date}`);
  }
});

// Displays photos in the gallery
function displayPhotos(photos, description) {
  displayError(""); // Clear previous error message
  if (!photos || photos.length === 0) {
    displayError("No photos available for this date.");
    return;
  }
  const gallery = document.getElementById("photo-gallery");
  gallery.innerHTML = photos.map(photo => `
    <figure>
      <img src="${photo.img_src}" alt="Mars photo taken by ${photo.camera.full_name}">
      <figcaption>${description}</figcaption>
    </figure>
  `).join('');
}

// Load initial photos on page load
window.addEventListener("load", loadInitialPhotos);
