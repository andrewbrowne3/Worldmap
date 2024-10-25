// src/components/CountryPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import World from "@react-map/world";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Header from "./Header";

const CountryPage = () => {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const [countryData, setCountryData] = useState(null);
  const [size, setSize] = useState(window.innerWidth > 768 ? 1400 : 500); // Initialize size based on screen width

  useEffect(() => {
    // Adjust map size based on window resizing
    const handleResize = () => {
      setSize(window.innerWidth > 768 ? 1400 : 300);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup event listener on unmount
  }, []);

  const showToast = (selectedCountry) => {
    toast(`Selected country: ${selectedCountry}`);
  };

  const redirect = (selectedCountry) => {
    navigate(`/${selectedCountry}`);
  };

  const fetchCountryData = async (selectedCountryCode) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${selectedCountryCode}`);
      setCountryData(response.data[0]); // Set country data to the first result
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  return (
    <div>
      <Header />
      <h2>Welcome to the {countryCode} page!</h2>
      <World
        onSelect={(selectedCountry) => {
          showToast(selectedCountry);
          redirect(selectedCountry);
          fetchCountryData(selectedCountry);
        }}
        size={size} // Responsive size based on screen width
        hoverColor="orange"
        type="select-single"
        hints={true}
        strokeColor="blue"
      />
      <ToastContainer />

      {countryData && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>Country Information</h3>
          <p><strong>Name:</strong> {countryData.name.common}</p>
          <img src={countryData.flags.png} alt={`Flag of ${countryData.name.common}`} width={100} />
          <p><strong>Official Name:</strong> {countryData.name.official}</p>
          <p><strong>Capital:</strong> {countryData.capital?.[0]}</p>
          <p><strong>Region:</strong> {countryData.region}</p>
          <p><strong>Population:</strong> {countryData.population.toLocaleString()}</p>
          <p><strong>Languages:</strong> {Object.values(countryData.languages || {}).join(", ")}</p>
          <p><strong>Currency:</strong> {Object.values(countryData.currencies || {}).map(currency => currency.name).join(", ")}</p>
          <p><strong>Timezone(s):</strong> {countryData.timezones.join(", ")}</p>
          <a href={countryData.maps.googleMaps} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
        </div>
      )}
    </div>
  );
};

export default CountryPage;
