import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAirQuality, getWeather } from "../OpenWeather/apiService";
import  {Navbar}  from "../Home b4 Login/Navbar"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './HomeAft.css';

export const HomeAfterLogin = () => {
  const navigate=useNavigate();
  const [userName, setUserName] = useState("");
  const [airQuality, setAirQuality] = useState(null);
  const [weather, setWeather] = useState(null);
  const [isSmsEnabled, setIsSmsEnabled] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [vehicleMiles, setVehicleMiles] = useState("");
  const [energyUsage, setEnergyUsage] = useState("");
  const [userFootprint, setUserFootprint] = useState(null);

  const calculateFootprint = () => {
    // Example calculation (you can enhance this logic)
    const vehicleEmissions = vehicleMiles * 0.411; // kg CO2 per mile
    const energyEmissions = energyUsage * 0.233; // kg CO2 per kWh
    const totalFootprint = vehicleEmissions + energyEmissions;

    setUserFootprint(totalFootprint.toFixed(2));
  };
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
    // Fetch air quality and weather data
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
  const handleSmsSubscription = async () => {
    if (!isSmsEnabled) {
      try {
        const { airMessage, weatherMessage } = generateAdvice(); // Get advice messages
  
        await axios.post("http://localhost:5000/send-sms", {
          message: `🌍 Environmental Update 🌤️\n\n${airMessage}\n\n${weatherMessage}`,
        });
  
        alert("SMS Sent Successfully!");
        setIsSmsEnabled(true); // Prevent multiple sends
      } catch (error) {
        console.error("Error sending SMS:", error);
      }
    }
  };
  
  const handleClose = () => {
    setIsModalOpen(false); // Only closes the modal, no SMS sending
  };

  const generateAdvice = () => {
    let airMessage = "";
    let weatherMessage = "";
     // Air Quality Messages
     if (airQuality) {
        const aqi = airQuality.list[0].main.aqi; // Air Quality Index (AQI)
        switch (aqi) {
          case 1:
            airMessage =
              "The air quality is excellent. Take a deep breath and enjoy the outdoors!";
            break;
          case 2:
            airMessage =
              "The air quality is good. It's safe to go outside, but sensitive individuals should still stay aware.";
            break;
          case 3:
            airMessage =
              "The air quality is moderate. If you have respiratory issues, consider limiting outdoor activities.";
            break;
          case 4:
            airMessage =
              "The air quality is poor. It's advisable to wear a mask outdoors to reduce exposure to pollutants.";
            break;
          case 5:
            airMessage =
              "The air quality is very poor. Avoid outdoor activities, wear a mask, and keep windows closed.";
            break;
          default:
            airMessage =
              "Air quality information is not available at the moment.";
        }
      }
  
      // Weather Messages
      if (weather) {
        const temp = weather.main.temp; // Temperature in Celsius
        const condition = weather.weather[0].main.toLowerCase(); // Weather condition (e.g., rain, clear)
  
        // Temperature-based advice
        if (temp < 5) {
          weatherMessage =
            "It's freezing outside! Wear heavy winter clothing and stay warm.";
        } else if (temp >= 5 && temp < 15) {
          weatherMessage = "It's cold outside. Wear a warm sweater or jacket.";
        } else if (temp >= 15 && temp < 25) {
          weatherMessage = "The weather is mild. A light jacket should be enough.";
        } else if (temp >= 25 && temp < 35) {
          weatherMessage =
            "It's warm outside. Wear comfortable clothes and stay hydrated.";
        } else if (temp >= 35) {
          weatherMessage =
            "It's very hot outside! Avoid prolonged exposure, wear light clothes, and drink plenty of water.";
        }
  
        // Weather condition-based advice
        if (condition.includes("rain")) {
          weatherMessage += " Also, it's rainy. Don't forget to carry an umbrella.";
        } else if (condition.includes("snow")) {
          weatherMessage +=
            " Expect snow. Wear waterproof shoes and stay safe.";
        } else if (condition.includes("thunderstorm")) {
          weatherMessage +=
            " There's a thunderstorm. Stay indoors and avoid open areas.";
        } else if (condition.includes("fog")) {
          weatherMessage +=
            " Visibility is low due to fog. Drive carefully and wear reflective clothing if walking.";
        } else {
          weatherMessage += " The weather looks clear. Enjoy your day!";
        }
      }
  
    return { airMessage, weatherMessage };
  };
  const { airMessage, weatherMessage } = generateAdvice();
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black flex justify-center items-center py-10">
    <Navbar/>
      <h1 className="text-white text-3xl font-semibold fofo top-32 text-center absolute right-56">
        Welcome, {userName}!
 </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 top-64 absolute gap-6">
       
        <div className="p-6 bg-black bg-opacity-20 border border-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
          <h2 className="text-white text-xl font-bold mb-2">
            Air Quality Alerts
          </h2>
          <p className="text-gray-300 mb-4">
            Stay updated on the air quality around you and receive real-time
            alerts for health safety.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition"
          >
            Learn More
          </button>
        </div>
        <div className="p-6 bg-black bg-opacity-20 border border-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
          <h2 className="text-white text-xl font-bold mb-2">
            Eco Product Verification
          </h2>
          <p className="text-gray-300 mb-4">
            Verify if the products you use are eco-friendly and sustainable with
            our AI-powered tools.
          </p>
          <button className="bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition" onClick={() => navigate("/verify-product")}>
            Go verify
          </button>
        </div>
        {/* Card 3 */}
        <div className="p-6 bg-black bg-opacity-20 border border-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
          <h2 className="text-white text-xl font-bold mb-2">
            Carbon footesteps counter
          </h2>
          <p className="text-gray-300 mb-4">
            Get detailed insights into carbon safety and avoid potential health
            risks with carbon.
          </p>
          <button className="bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition" onClick={() => setShowModal(true)}>
           Calculate Now
          </button>
          {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Carbon Footprint Calculator</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Daily Vehicle Miles
              </label>
              <input
                type="number"
                value={vehicleMiles}
                onChange={(e) => setVehicleMiles(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter miles driven per day"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Daily Energy Usage (kWh)
              </label>
              <input
                type="number"
                value={energyUsage}
                onChange={(e) => setEnergyUsage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter energy usage in kWh"
              />
            </div>
            <button
              className="bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition w-full"
              onClick={calculateFootprint}
            >
              Calculate
            </button>
            {userFootprint && (
              <div className="mt-4 text-center">
                <p className="text-green-700 font-bold">
                  Your Carbon Footprint: {userFootprint} kg CO2/day
                </p>
              </div>
            )}
            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400 transition w-full"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
        </div>
        {/* Card 4 */}
        <div className="p-6 bg-black bg-opacity-20 border border-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
          <h2 className="text-white text-xl font-bold mb-2">
            Sustainability Score
          </h2>
          <p className="text-gray-300 mb-4">
            Track the sustainability and health impact of your lifestyle
            choices.
          </p>
          <button className="bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition">
            Comin soon
          </button>
        </div>
        {/* Other Cards */}
        {/* Add other cards here */}
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Air Quality and Weather Details
            </h2>
            {loading ? (
              <p className="text-gray-500">Loading data...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                <div className="mb-4">
                  <p>
                    <strong>Air Quality:</strong> {getAqiLevel(airQuality.list[0].main.aqi)}
                  </p>
                  <p>
                    <strong>PM2.5:</strong> {airQuality.list[0].components.pm2_5} μg/m³
                  </p>
                  <p>
                    <strong>PM10:</strong> {airQuality.list[0].components.pm10} μg/m³
                  </p>
                </div>
                <div className="mb-4">
                  <p>
                    <strong>Weather:</strong> {weather.weather[0].description}
                  </p>
                  <p>
                    <strong>Temperature:</strong> {weather.main.temp}°C
                  </p>
                </div>
                <div className="mb-4">
                  <p>
                    <strong>Advice:</strong> {airMessage}<br/><br/> {weatherMessage}
                  </p>
                </div>
              </>
            )}
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
              className="bg-purple-700 text-white py-2 ml-8 px-4 rounded-lg hover:bg-purple-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 