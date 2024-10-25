// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import "react-toastify/dist/ReactToastify.css"; // Import CSS here
import WorldMap from "./components/WorldMap.js";
import CountryPage from "./components/CountryPage.js";

function App() {
  return (
    <div className="App">
    
      <Router>
        <Routes>
          <Route path="/" element={<WorldMap />} />
          <Route path="/:countryCode" element={<CountryPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
