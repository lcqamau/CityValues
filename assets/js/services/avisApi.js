import React from 'react';
import Axios from 'axios';

function findAll(){
  return Axios
  .get("/api/avis")
  .then(response =>response.data['hydra:member'])
}

function create(Produits, user) {
    return Axios.post("/api/paniers", {
      ...Paniers,
      Produits: `/api/produits/${Paniers.Produits}`,
      Users: `/api/Users/${Paniers.Users}`,
    });
  }
  function find(idProduit){
    return Axios
    .get(`/api/avis/${idProduit}`)
    .then(response =>response.data['hydra:member'])
  }
export default {
    findAll,
    find,
    create
  };