import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAirQuality, getWeather } from "../OpenWeather/apiService";
import { Navbar } from "../Home b4 Login/Navbar";
import axios from "axios";
import "./HomeAft.css";

export const HomeAfterLogin = () => {
  const [userName, setUserName] = useState("");
  const [airQuality, setAirQuality] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSmsEnabled, setIsSmsEnabled] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email.split("@")[0]);
      } else {
        setUserName("");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            setLoading(true);
            try {
              const airQualityData = await getAirQuality(
                position.coords.latitude,
                position.coords.longitude
              );
              const weatherData = await getWeather(
                position.coords.latitude,
                position.coords.longitude
              );
              setAirQuality(airQualityData);
              setWeather(weatherData);
            } catch (err) {
              setError("Unable to fetch air quality or weather data.");
              console.error(err);
            } finally {
              setLoading(false);
            }
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

    fetchData();
  }, []);

  const getAqiLevel = (aqi) => {
    const levels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
    return levels[aqi - 1] || "Unknown";
  };

  const handleSmsSubscription = () => {
    setIsSmsEnabled(true);
  };

  const handleClose = async () => {
    if (isSmsEnabled) {
      try {
        await axios.post("http://localhost:5000/send-sms", {
          message: `Air Quality Alert: ${getAqiLevel(
            airQuality?.list[0]?.main?.aqi
          )}. PM2.5: ${airQuality?.list[0]?.components?.pm2_5} μg/m³, PM10: ${
            airQuality?.list[0]?.components?.pm10
          } μg/m³`,
        });
        alert("SMS Sent Successfully!");
      } catch (error) {
        console.error("Error sending SMS:", error);
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black flex flex-col items-center py-10">
      <Navbar />
      <h1 className="text-white text-4xl font-bold text-center mt-10 mb-20">
        Welcome, {userName}!
      </h1>
      <div className="mt-80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl w-full px-6">
        {[
          "Air Quality Alerts",
          "Eco Scan",
          "Verify Product",
          "Sustainability Tips",
        ].map((title, index) => (
          <div
            key={index}
            className="p-8 bg-black bg-opacity-20 border border-white rounded-2xl shadow-lg w-full"
          >
            <h2 className="text-white text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-300 mb-4">
              Explore {title.toLowerCase()} here.
            </p>
            {index === 0 ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-purple-700 text-white py-2 px-4 rounded-lg"
              >
                Learn More
              </button>
            ) : (
              <button className="bg-purple-700 text-white py-2 px-4 rounded-lg">
                Coming Soon
              </button>
            )}
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Air Quality Details</h2>
            {loading ? (
              <p>Loading data...</p>
            ) : (
              <>
                <p>
                  <strong>Air Quality:</strong>{" "}
                  {getAqiLevel(airQuality?.list[0]?.main?.aqi)}
                </p>
                <p>
                  <strong>PM2.5:</strong>{" "}
                  {airQuality?.list[0]?.components?.pm2_5} μg/m³
                </p>
                <p>
                  <strong>PM10:</strong> {airQuality?.list[0]?.components?.pm10}{" "}
                  μg/m³
                </p>
                <button
                  onClick={handleSmsSubscription}
                  className={`mt-4 px-4 py-2 rounded-lg ${
                    isSmsEnabled ? "bg-green-600" : "bg-blue-600"
                  } text-white`}
                >
                  {isSmsEnabled ? "SMS Enabled ✅" : "Receive SMS"}
                </button>
                <button
                  onClick={handleClose}
                  className="mt-4 ml-2 bg-purple-700 text-white py-2 px-4 rounded-lg"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
