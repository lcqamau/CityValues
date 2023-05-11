import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import "../../styles/footer.css";
import ReactDOM from 'react-dom';



const Footer = () => {
    
    return ( 
        <>
            <footer>
                <div className="footer-col">
                    <h1>à propos de ACME</h1>
                    <p>Chez ACME, nous sommes passionnés par l'expression de soi à travers le sport. Nous croyons que chaque individu a le pouvoir de repousser ses limites, de défier les attentes et de réaliser des choses extraordinaires. C'est pourquoi nous nous efforçons de créer des chaussures de basket-ball de haute qualité qui allient style, confort et performance.</p>
                </div>
                <div className="footer-col">
                    <h1>Liens Rapides</h1>

                    <NavLink className="nav-link" to="/Chaussures">Chaussures</NavLink>
                </div>
            </footer>
        </>
    )
}
export default Footer;