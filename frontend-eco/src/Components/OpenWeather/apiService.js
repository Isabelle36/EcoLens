import axios from "axios";

const API_KEY = "5f207c6ca52705c9ee13f1ada7566c4f";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getAirQuality = async (lat, lon) => {
  const url = `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

export const getCurrentWeather = async (lat, lon) => {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

export const getClimateData = async (lat, lon) => {
  const url = `${BASE_URL}/climate/month?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};
