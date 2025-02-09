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
import VerifyProd from "./Components/Home Aft Login/VerifyProd";
import ScanProd from "./Components/Home Aft Login/ScanProd";
import { FingerprintProvider } from "./Fingerprint/FingerprintContext"; 
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";

function App() {
  const { isLoading, error, data, getData } = useVisitorData(
    { extendedResult: true },
    { immediate: true }
  );
  return (
    
    <FingerprintProvider>
    <Router>
      <div>
      <div style={{ display: "none" }}>
        {/* Debugging Visitor Data */}
        <button onClick={() => getData({ ignoreCache: true })}>
          Reload Data
        </button>
        <p>Visitor ID: {isLoading ? "Loading..." : data?.visitorId}</p>
        <pre>{error ? error.message : JSON.stringify(data, null, 2)}</pre>
      </div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-product" element={<VerifyProd visitorId={data?.visitorId} />} />
          <Route path="/scan-product" element={<ScanProd />} />
        </Routes>
      </div>
    </Router>
    </FingerprintProvider>
  );
}

export default App;