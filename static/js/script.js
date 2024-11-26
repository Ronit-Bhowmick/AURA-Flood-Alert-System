document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('coordinatesForm').addEventListener('submit', fetchWeatherData);
});

async function fetchWeatherData(event) {
    event.preventDefault();
    
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    try {
        const response = await fetch(`/fetch_weather?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}`);
        const data = await response.json();
        
        if (data.error) {
            console.error('Error fetching weather data:', data.error);
            document.getElementById('weatherInfo').innerText = 'Error fetching weather data';
            return;
        }
        
        displayWeatherData(data.weather_info);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weatherInfo').innerText = 'Error fetching weather data';
    }
}

function displayWeatherData(weatherInfo) {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    
    // Clear previous data
    weatherInfoDiv.innerHTML = '';

    // Display new data
    weatherInfoDiv.innerHTML = `
        <h2>Weather Data</h2>
        <p>Temperatures: ${weatherInfo.temperatures}</p>
        <p>Precipitation Probability: ${weatherInfo.precipitation_probability}</p>
        <p>Precipitation: ${weatherInfo.precipitation}</p>
        <p>Rain: ${weatherInfo.rain}</p>
        <p>Showers: ${weatherInfo.showers}</p>
        <p>Wind Speed: ${weatherInfo.wind_speed}</p>
        <p>Soil Moisture: ${weatherInfo.soil_moisture}</p>
    `;
}


document.addEventListener('DOMContentLoaded', () => {
    fetchRainfallData();
});

async function fetchRainfallData() {
    try {
        const response = await fetch('/fetch_weather');
        const data = await response.json();
        
        if (data.error) {
            console.error('Error fetching rainfall data:', data.error);
            return;
        }
        
        const latestRainfall = data.rain[0]; // Assume the first value is the latest
        
        updateRainfallAmount(latestRainfall);
    } catch (error) {
        console.error('Error fetching rainfall data:', error);
    }
}

function updateRainfallAmount(rainfall) {
    const rainfallElement = document.getElementById('rainfall');
    const alertElement = document.getElementById('alert');
    
    rainfallElement.textContent = rainfall;

    if (rainfall >= 1000) {
        alertElement.textContent = 'Alert: Rainfall amount exceeds the threshold!';
        alertElement.classList.add('alert-danger');
        alertElement.style.display = 'block';
    } else {
        alertElement.style.display = 'none';
    }
}
