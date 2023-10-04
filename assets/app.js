/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { HashRouter, Redirect, Route, Switch, withRouter } from "react-router-dom";
import { ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
// start the Stimulus application
import './bootstrap';
import Navbar from './js/components/Navbar';
import Footer from './js/components/Footer';
import RegisterPage from './js/pages/RegisterPage';
import PrivateRoute from "./js/components/PrivateRoute";
import AuthContext from "./js/contexts/AuthContext";
import HomePage from './js/pages/HomePage';
import AjoutProduit from './js/pages/commercant/AjoutProduit';
import VoirProduit from './js/pages/commercant/VoirProduit';
import LoginPage from './js/pages/LoginPage';
import Commerce from './js/pages/commercant/Commerce';
import ModifCommerce from './js/pages/commercant/ModifCommerce';
import VoirEchange from './js/pages/echange/VoirEchange';
import AjoutEchange from './js/pages/echange/AjoutEchange';
import Benevolat from './js/pages/Benevolat';
import Echange from './js/pages/Echange';
import authAPI from './js/services/authAPI';
import FormCommerce from './js/pages/FormCommerce';
// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import jwtDecode from 'jwt-decode';




authAPI.setup();

const App = () =>{

    const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated());
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
    var token = localStorage.getItem("authToken");
  
    if (token) {
      var decodedToken = jwtDecode(token);
      if (decodedToken.roles[0] === "ROLE_ADMIN") {
        setIsAdmin(true);
      }
    }
  
    },[isAuthenticated]);
  
    const AdminRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated && isAdmin ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );

    console.log(isAuthenticated);

    const NavbarWithRouter = withRouter(Navbar);

    return( 
    <AuthContext.Provider value={{
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated
    }}>
    <HashRouter>
        <NavbarWithRouter isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated} />
        <main>
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/Commerce" component={Commerce}/>
                <Route path="/Echange" component={Echange}/>
                <Route path="/Benevolat" component={Benevolat}/>   
                <Route path="/FormCommerce" component={FormCommerce}/>  
                <Route path="/ajout-produit" component={AjoutProduit}/>
                <Route path="/voir-produit" component={VoirProduit}/>  
                <Route path="/ajout-echange" component={AjoutEchange}/> 
                <Route path="/voir-echange" component={VoirEchange}/>      





                <Route path="/" component={HomePage}/>
            </Switch>
        </main>
    </HashRouter>
    <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </AuthContext.Provider>
  );
};
const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);

