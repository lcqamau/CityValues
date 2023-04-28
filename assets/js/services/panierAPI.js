import React from 'react';
import Axios from 'axios';

function findAll(){
  return Axios
  .get("/api/paniers")
  .then(response =>response.data['hydra:member'])
}

function create(Paniers, id) {
  return Axios.post("/api/paniers", {
    ...Paniers,
    Produits: `/api/produits/${Paniers.Produits}`,
  });
}


 export default {
    findAll,
    create
  };