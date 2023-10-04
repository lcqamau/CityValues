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
      <h1>CityValues</h1>
      <Link to="/Commerce" className="landing-cta-button">Trouve Ton Commerce</Link>
    </div>
    <div className="div wave footer-wave"></div>
    <Footer/>
    </>
  );
}

export default HomePage;