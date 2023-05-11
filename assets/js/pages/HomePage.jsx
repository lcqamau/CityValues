import React from "react";
import "../../styles/homepage.css";
import { Link } from "react-router-dom";
import images from "../../media/img/index.jsx";
import Footer from '../components/Footer';

function HomePage() {
  return (
    <>

    <div className="landing-section">
      <img src={ images.LandingPageImg } alt=""/>
      <h1>ACME</h1>
      <Link to="/chaussures" className="landing-cta-button">Trouve TA paire</Link>
    </div>
    <div className="div wave footer-wave"></div>
    <Footer/>
    </>
  );
}

export default HomePage;