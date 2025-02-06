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
import { HomeAfterLogin } from "./Components/Home Aft Login/HomeAfterLogin";
import Notif from "./Components/Home Aft Login/Notif";
import AirQuality from "./Components/Home Aft Login/AirQuality";
import VerifyProd from "./Components/Home Aft Login/VerifyProd";
import ScanProd from "./Components/Home Aft Login/ScanProd";

function App() {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/login" element={<Login />} />
         
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home-after-login" element={<HomeAfterLogin />} />
          <Route path="/verify-product" element={<VerifyProd />} />
          <Route path="/scan-product" element={<ScanProd />} />
          <Route path="/notifications" element={<Notif />} />
          <Route path="/air-quality" element={<AirQuality />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
