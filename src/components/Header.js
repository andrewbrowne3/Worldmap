// src/components/Header.js
import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">Explore the World</h1>
      <p className="header-description">
        Click on any country to learn more about it! Discover capitals, languages, and other interesting facts.
      </p>
    </header>
  );
};

export default Header;