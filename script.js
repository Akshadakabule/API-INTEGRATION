const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temp");
const conditionEl = document.getElementById("condition");

function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (city === "") {
        conditionEl.textContent = "Please enter a city name";
        return;
    }

    // Step 1: Get latitude & longitude from city name
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
        .then(response => response.json())
        .then(locationData => {
            if (!locationData.results) {
                conditionEl.textContent = "City not found";
                return;
            }

            const lat = locationData.results[0].latitude;
            const lon = locationData.results[0].longitude;
            cityEl.textContent = locationData.results[0].name;

            // Step 2: Get weather using lat & lon
            return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        })
        .then(response => response.json())
        .then(weatherData => {
            tempEl.textContent = weatherData.current_weather.temperature;
            conditionEl.textContent =
                `Wind Speed: ${weatherData.current_weather.windspeed} km/h`;
        })
        .catch(() => {
            conditionEl.textContent = "Error fetching weather data";
        });
}
