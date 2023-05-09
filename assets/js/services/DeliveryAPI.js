import React from 'react';
import Axios from 'axios';
import Cache from "./cache";


function create(livraison){
    return Axios
                .post("api/livraisons", livraison)
                .then(async response => {
                    const cachedLivraisons = await Cache.get("livraison");
                    if (cachedLivraisons) {
                        Cache.set("livraison", [...cachedLivraisons, response.data]);
                    }
                    return response;
                });
}



function findAll(){
    return Axios
                .get("/api/livraisons")
                .then(response => response.data['hydra:member'])
}       

function findAllUserDelivery(userId){
    return Axios
    .get("/api/livraisons?user_id="+userId)
    .then(response => response.data['hydra:member'])
}



export default {
    findAll,
    findAllUserDelivery,
    create,
}
