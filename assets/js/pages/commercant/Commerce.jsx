import React from 'react';
import Map from '../../components/Map';
/*

 Il faut afficher la map, un bouton de filtre
 Une liste en dessous avec tous les commerçants pour accèder à leurs listes de produits

*/
function Commerce() {

    return (
        <>  
        <div class="container text-center">
            <h1>Trouve ton commerce </h1>
            <Map></Map>
        </div>

        </>
    );
}
export default Commerce;