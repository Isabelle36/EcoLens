import React, { useEffect, useState } from "react";
import { getAirQuality, getCurrentWeather } from "./apiService";

const EnvironmentalInsights = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [airQuality, setAirQuality] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Get user's location
  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (err) => {
            setError("Location permission denied. Unable to fetch data.");
            console.error(err);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    fetchLocation();
  }, []);

  // Fetch environmental data based on location
  useEffect(() => {
    const fetchEnvironmentalData = async () => {
      if (location.lat && location.lon) {
        try {
          setLoading(true);
          const airQualityData = await getAirQuality(location.lat, location.lon);
          setAirQuality(airQualityData);

          const weatherData = await getCurrentWeather(location.lat, location.lon);
          setWeather(weatherData);

          setLoading(false);
        } catch (err) {
          setError("Failed to load environmental data.");
          console.error(err);
        }
      }
    };

    fetchEnvironmentalData();
  }, [location]);

  return (
    <div className="p-6 bg-gray-100 shadow-md rounded-md max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Environmental Insights</h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : airQuality && weather ? (
        <div>
          <h3 className="text-lg font-semibold">Current Weather:</h3>
          <p>Temperature: {Math.round(weather.main.temp)}°C</p> {/* Correct temp */}
          <p>Condition: {weather.weather[0].description}</p>

          <h3 className="text-lg font-semibold mt-4">Air Quality Index (AQI):</h3>
          <p>PM2.5: {airQuality.list[0].components.pm2_5} μg/m³</p>
          <p>PM10: {airQuality.list[0].components.pm10} μg/m³</p>
          <p>
            AQI Level: {airQuality.list[0].main.aqi}{" "}
            {getAqiLevel(airQuality.list[0].main.aqi)}
          </p>
        </div>
      ) : (
        <p>Could not fetch data.</p>
      )}
    </div>
  );
};

// Helper function to interpret AQI levels
const getAqiLevel = (aqi) => {
  const levels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
  return levels[aqi - 1] || "Unknown";
};

export default EnvironmentalInsights;
