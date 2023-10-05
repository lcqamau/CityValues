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
  const [typeOk, setType] = useState(false)
  
  useEffect(() => {
    var token = localStorage.getItem("authToken");
    if (token) {
      var decodedToken = jwtDecode(token);
      if (decodedToken.roles[0] === "ROLE_ADMIN") {
          setIsAdmin(true);
      }
    }
    async function fetchData() {
      const response = await authAPI.getType(localStorage.getItem('id'));
      setType(response);
    }
    fetchData();

    },[isAuthenticated,typeOk]);
  
    return ( 
    <nav className="navbar navbar-expand-lg navbar-white bg-white">
    <div className="container-fluid">
      <NavLink className="navbar-brand" to="/">CityValues 🌳</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
  
      <div className="collapse navbar-collapse" id="navbarColor02">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/commerce">Commerces</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/benevolat">Benevolats</NavLink>
          </li>
          <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Echange">Echanges</NavLink>
              </li>
          </>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/Panier"><img id="photo" src="https://www.pngplay.com/wp-content/uploads/3/Panier-PNG-De-Fichier-Telecharger.png" alt="..."/></NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
            {localStorage.getItem('type') == "Commercant" && 
              <>
              <div class="dropdown px-3">
                <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Professionnel
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <NavLink className="dropdown-item" to="/ajout-produit">Ajouter un produit</NavLink>
                  <NavLink className="dropdown-item" to="/voir-produit">Voir ses produits</NavLink>
                  <NavLink className="dropdown-item" to="/modif-commerce">Modification commerce</NavLink>
                </div>
              </div>
              </>
              || localStorage.getItem('type') == "Utilisateur" &&
              <>
              <div class="dropdown px-3">
                <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Utilisateur
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <NavLink className="dropdown-item" to="/ajout-echange">Ajouter un échange</NavLink>
                  <NavLink className="dropdown-item" to="/voir-echange">Voir ses échanges</NavLink>
                </div>
              </div>
              </>
            }
          {!isAuthenticated && <>

            <li className="nav-item px-3">
              <NavLink to="/register" className="btn btn-dark">Inscription</NavLink>
              </li>
            <li className="nav-item">
                <NavLink to="/login" className="btn btn-success">Connexion</NavLink>
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
 