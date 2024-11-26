from flask import Flask, jsonify, render_template, url_for
import requests

app = Flask(__name__, static_folder='static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/fetch_weather')
def fetch_weather():
    latitude = '52.52'
    longitude = '13.4050'  # Updated to Berlin coordinates for example
    api_url = f'https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&hourly=temperature_2m,precipitation_probability,precipitation,rain,showers,wind_speed_10m,soil_moisture_0_to_1cm'
    
    try:
        response = requests.get(api_url)
        data = response.json()

        # Extract the required data using correct keys
        temperatures = data['hourly']['temperature_2m']
        precipitation_probability = data['hourly']['precipitation_probability']
        precipitation = data['hourly']['precipitation']
        rain = data['hourly']['rain']
        showers = data['hourly']['showers']
        wind_speed = data['hourly']['wind_speed_10m']
        soil_moisture = data['hourly']['soil_moisture_0_to_1cm']

        weather_info = {
            "temperatures": temperatures,
            "precipitation_probability": precipitation_probability,
            "precipitation": precipitation,
            "rain": rain,
            "showers": showers,
            "wind_speed": wind_speed,
            "soil_moisture": soil_moisture,
        }

        alert_message = "Weather data fetched successfully!"

        return jsonify(weather_info=weather_info, message=alert_message)

    except Exception as e:
        return jsonify(error=str(e))
    

@app.route('/about')
def about():
    return render_template("about.html")

@app.route('/rain_alert')
def rain_alert():
    return render_template("rain_alert.html")

@app.route('/flood_safety_tips')
def flood_safety_tips():
    return render_template("flood_safety_tips.html")
    
if __name__ == "__main__":
    app.run(debug=True)
