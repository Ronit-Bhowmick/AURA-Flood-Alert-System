document.addEventListener('DOMContentLoaded', () => {
    simulateRainfallData();
});

function simulateRainfallData() {
    // Simulate some rainfall data for testing
    const simulatedRainfall = 1200; // Example value, adjust as needed for testing
    
    updateRainfallAmount(simulatedRainfall);
}

function updateRainfallAmount(rainfall) {
    const rainfallElement = document.getElementById('rainfall');
    const alertElement = document.getElementById('alert');
    const threshold = 1000;

    rainfallElement.textContent = rainfall;

    if (rainfall >= threshold) {
        alertElement.textContent = 'Alert: Rainfall amount exceeds the threshold!';
        alertElement.style.display = 'block';
    } else {
        alertElement.style.display = 'none';
    }
}
