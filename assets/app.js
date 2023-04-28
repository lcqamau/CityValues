/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import { ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
// start the Stimulus application
import './bootstrap';
import Navbar from './js/components/Navbar';
import RegisterPage from './js/pages/RegisterPage';
import PrivateRoute from "./js/components/PrivateRoute";
import Panier from  './js/pages/Panier';
import Chaussures from './js/pages/Chaussures';
import AuthContext from "./js/contexts/AuthContext";
import HomePage from './js/pages/HomePage';
import LoginPage from './js/pages/LoginPage';
import authAPI from './js/services/authAPI';
// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';



authAPI.setup();

const App = () =>{

    const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated());

    console.log(isAuthenticated);

    const NavbarWithRouter = withRouter(Navbar);

    return( 
    <AuthContext.Provider value={{
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated
    }}>
    <HashRouter>
        <NavbarWithRouter isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated} />
        <main className="container pt-5">
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <PrivateRoute path="/Chaussures" component={Chaussures}/>
                <PrivateRoute path="/Panier" component={Panier}/>
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

