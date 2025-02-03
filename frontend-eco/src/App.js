import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home b4 Login/Home";
import { About } from "./Components/About/About";
import { Contact } from "./Components/Contact/contact";
import { MyProfile } from "./Components/MyProfile/profile";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<MyProfile  />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
