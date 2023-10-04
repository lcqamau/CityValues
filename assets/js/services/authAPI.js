import axios from "axios";
import jwtDecode from "jwt-decode";

function logout() {
    window.localStorage.clear();
    delete axios.defaults.headers["Authorization"];
};

function authenticate(credentials){
    return axios
        .post("/api/login_check", credentials)
        //Modification 04/10 : Ajout de l'id dans le localStorage
        .then(function(response){
            if(response.data.token){
                window.localStorage.setItem("authToken", response.data.token);
                window.localStorage.setItem("id", response.data.data.id);

            }
        });
}

/**
 * Positionne le token JWT sur Axios
 * @param {string} token Le token JWT
 */
function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Mise en place lors du chargement de l'application 
 */
function setup() {
    // 1. Voir si on a un token ? 
    const token = window.localStorage.getItem("authToken");
    //2. Si le token est encore validé 
    if(token) {
        const {exp: expiration} = jwtDecode(token)
        if(expiration *1000 > new Date().getTime()) {
            setAxiosToken(token);
        } 
    }
}

/**
 * Permet de savoir si on est authentifié ou pas 
 * @returns boolean
 */
function isAuthenticated() {
  // 1. Voir si on a un token ? 
  const token = window.localStorage.getItem("authToken");
  //2. Si le token est encore validé 
  if(token) {
      const {exp: expiration} = jwtDecode(token)
      if(expiration *1000 > new Date().getTime()) {
          return true
        }
    return false;
    }
    return false;
}

/**
 * Mets à jour le type dans le localStorage
 */
function getType(id) {
    if(id){
        return axios
            .get('http://127.0.0.1:8000/api/users/'+id)
            .then(function(response){
                if(response.data["@type"]){
                    window.localStorage.setItem("type",response.data["@type"]);
                    return true;
                }
            });
    }
  }

export default{
    authenticate,
    logout,
    setup,
    isAuthenticated,
    getType
}