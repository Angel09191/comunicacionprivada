import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/Navbar";
import Footer from "./assets/components/Footer";
import Home from "./assets/pages/Home";
import SignUp from "./assets/pages/SignUp";
import Instructions from "./assets/pages/Instructions";
import Contact from "./assets/pages/Contact";
import Admin from "./assets/pages/Admin";
import "./assets/stylesheets/shared-styles.css";

function App() {
  return (
    <Router>
      <div className="app-wrapper" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/instructions" element={<Instructions />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
