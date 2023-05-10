import React from "react";
import "../../styles/homepage.css";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="background-image">
      <header className="App-header">
        <h1>Chaussures de qualité à petits prix</h1>
        <Link to="/Chaussures" className="cta-button">Explorer</Link>
      </header>
      <div className="presentation-section">
        <h2>Bienvenue sur notre site catalogue de chaussures</h2>
        <p>
          Découvrez notre large sélection de chaussures pour homme, femme et
          enfant à des prix défiant toute concurrence. Que vous recherchiez des
          chaussures de sport, des chaussures de ville ou des bottes, nous avons
          ce qu'il vous faut.
        </p>
        <img
          className="presentation-image"
          src="https://m.media-amazon.com/images/I/51lbsvW0EXL._AC_UY695_.jpg"
          alt="Chaussures de qualité à petits prix"
        />
      </div>
    </div>
  );
}

export default HomePage;