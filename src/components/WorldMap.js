import React, { useState, useEffect } from "react";
import World from "@react-map/world";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "./Header";

const WorldMap = () => {
  const navigate = useNavigate();
  const [size, setSize] = useState(window.innerWidth > 768 ? 1400 : 500); // Default size based on initial screen width

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth > 768 ? 1400 : 300); // Adjust for tablet/desktop vs. mobile
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);

  const redirect = (countryCode) => {
    navigate(`/${countryCode}`);
  };

  const showToast = (countryCode) => {
    toast(`Selected country: ${countryCode}`);
  };

  return (
    <div>
      <Header />
      <World
        hints={true}
        strokeColor="blue"
        onSelect={(countryCode) => {
          showToast(countryCode);
          redirect(countryCode);
        }}
        size={size} // Use responsive size
        hoverColor="orange"
        type="select-single"
      />
      <ToastContainer />
    </div>
  );
};

export default WorldMap;
