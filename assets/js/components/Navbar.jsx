import React, { useContext, useState, useEffect } from 'react';
import authAPI from '../services/authAPI';
import { NavLink } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import "../../styles/app.css"
import jwtDecode from 'jwt-decode';

const Navbar = ({history}) => {

  const { isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

  const handleLogout = () => {
      authAPI.logout();
      setIsAuthenticated(false);
      toast.info("Vous etes désormé déconnectés")
      history.push('/login');
  };
  
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    var token = localStorage.getItem("authToken");
  
    if (token) {
      var decodedToken = jwtDecode(token);
      if (decodedToken.roles[0] === "ROLE_ADMIN") {
          setIsAdmin(true);
      }
    }
  
    },[isAuthenticated]);
  


    return ( 
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <NavLink className="navbar-brand" to="/">ACME</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
  
      <div className="collapse navbar-collapse" id="navbarColor02">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/Chaussures">Chaussures</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profil">Profil</NavLink>
          </li>
          {isAdmin &&
          <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/stock">Produit</NavLink>
              </li>
          </>
        }
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/Panier"><img id="photo" src="https://www.pngplay.com/wp-content/uploads/3/Panier-PNG-De-Fichier-Telecharger.png" alt="..."/></NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {!isAuthenticated && <>
            <li className="nav-item">
              <NavLink to="/register" className="btn btn-info">Inscription</NavLink>
              </li>
            <li className="nav-item">
                <NavLink to="/login" className="btn btn-success">Conexion</NavLink>
            </li>
          </> || (

            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-primary">Déconnexion</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  </nav> 
    )
}
 
export default Navbar;
 