import axios from "axios";
import Cache from "./cache";

async function findAll() {
  const cachedProduits = await Cache.get("produits");

  if (cachedProduits) return cachedProduits;

  return axios.get("/api/produits").then(response => {
    const produits = response.data["hydra:member"];
    Cache.set("produits", produits);
    return produits;
  });
}

async function find(id) {
  const cachedProduit = await Cache.get("produits/" + id);

  if (cachedProduit) return cachedProduit;

  return axios.get("http://127.0.0.1:8000/api/produits/" + id).then(response => {
    const produit = response.data;

    Cache.set("produits." + id, produit);

    return produit;
  });
}


function deleteProduit(id){
  return axios
  .delete("/api/produits/" + id)
}

async function update(id, produit) {
  return axios.put("http://127.0.0.1:8000/api/produits/" + id, produit).then(async response => {
    const cachedProduits = await Cache.get("produits");
    const cachedProduit = await Cache.get("produits." + id);

    if (cachedProduit) {
      Cache.set("produits." + id, response.data);
    }

    if (cachedProduits) {
      const index = cachedProduits.findIndex(c => c.id === +id);
      cachedProduits[index] = response.data;
    }

    return response;
  });
}

async function create(produit) {
  return axios.post("http://127.0.0.1:8000/api/produits", produit).then(async response => {
    const cachedProduits = await Cache.get("produits");

    if (cachedProduits) {
      Cache.set("produits", [...cachedProduits, response.data]);
    }

    return response;
  });
}

export default {
  findAll,
  find,
  deleteProduit,
  create,
  update,
};