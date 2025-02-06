import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home b4 Login/Home";
import { About } from "./Components/About/About";
import { Contact } from "./Components/Contact/contact";
import { MyProfile } from "./Components/MyProfile/profile";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EnvironmentalInsights from "./Components/OpenWeather/EnvironmentalInsights";

function App() {
  return (
    <Router>
      <div>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<MyProfile  />} />
          <Route path="/insights" element={<EnvironmentalInsights />} />
          <Route path="/login" element={<Login  />} />
          <Route path="/signup" element={<SignUp  />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
