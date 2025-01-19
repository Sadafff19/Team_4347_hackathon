const userIcon = document.querySelector('.user-icon');
const dropdownMenu = document.querySelector('.dropdown-menu');

// Add click event to toggle dropdown menu visibility
userIcon.addEventListener('click', () => {
  // Toggle the display property of the dropdown menu
  if (dropdownMenu.style.display === 'block') {
    dropdownMenu.style.display = 'none';
  } else {
    dropdownMenu.style.display = 'block';
  }
});
function toggleMenu() {
  const nav2 = document.getElementById("nav2");
  nav2.classList.toggle("show");
}

// Close the dropdown menu when clicking outside
document.addEventListener('click', (event) => {
  if (!event.target.closest('.user-menu')) {
    dropdownMenu.style.display = 'none';
  }
});
// Select elements
const weatherButton = document.getElementById("get-location-button");
const locationButton = document.querySelector(".geo-btn");
const weatherInfoDiv = document.getElementById("weather-info");
const showDetails = document.querySelector(".showDetails");

const WEATHER_API_KEY = "7649b93d8e8f4082a35111846251801"; // Replace with your WeatherAPI key
const LOCATION_API_KEY = "0618645b0f8ad5d32bb0d50072e3b191"; // Replace with your PositionStack API key

// Display Weather
function displayWeather(data) {
  weatherInfoDiv.innerHTML = `
    <h2><i class="fa-solid fa-location-dot"></i> Weather in ${data.location.name}, ${data.location.country}</h2>
    <div id='weather'>
      <p><strong><img src="./photos/sun.png" alt=""></strong> ${data.current.temp_c}°C</p>
      <p><strong><img src="./photos/humidity.png" alt=""></strong> ${data.current.humidity}%</p>
      <p><strong><img src="./photos/hot.png" alt=""></strong> ${data.current.condition.text}</p>
    </div>
  `;
}

// Fetch Weather Data
function fetchWeather(position) {
  const { latitude, longitude } = position.coords;
  const url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${latitude},${longitude}&aqi=no`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        displayWeather(data);
      } else {
        weatherInfoDiv.textContent = "Error fetching weather data.";
      }
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
      weatherInfoDiv.textContent = "Failed to fetch weather data.";
    });
}

// Fetch User Location Details
function fetchLocation(position) {
  const { latitude, longitude } = position.coords;
  const url = `http://api.positionstack.com/v1/reverse?access_key=${LOCATION_API_KEY}&query=${latitude},${longitude}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.data && data.data.length > 0) {
        const location = data.data[0].label; // Fetch the formatted address
        showDetails.innerHTML = `<p><strong><img src="./photos/map.png" alt="">${location}</strong></p>`;
      } else {
        showDetails.textContent = "Unable to fetch location details.";
      }
    })
    .catch((error) => {
      console.error("Error fetching location details:", error);
      showDetails.textContent = "Error fetching location details.";
    });
}

// Handle errors for both functionalities
function handleLocationError(message) {
  weatherInfoDiv.textContent = "Unable to retrieve location. Please allow location access.";
  showDetails.textContent = message;
}

// Event listener for weather button
weatherButton.addEventListener("click", () => {
  weatherInfoDiv.textContent = "Fetching location...";
  navigator.geolocation.getCurrentPosition(fetchWeather, () =>
    handleLocationError("Unable to fetch weather data.")
  );
});

// Event listener for location button
locationButton.addEventListener("click", () => {
  showDetails.textContent = "Fetching location...";
  navigator.geolocation.getCurrentPosition(fetchLocation, () =>
    handleLocationError("Unable to fetch location details.")
  );
});
