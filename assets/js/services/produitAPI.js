import axios from "axios";

async function getAll(){
    var reponse = await axios.get('http://127.0.0.1:8000/api/produits');
    if(reponse.status == 200){
        return reponse.data["hydra:member"];
    }else{
        return [];
    }
}

async function addProduit(produit,idCommercant){
    const produitToAdd = {
        "nom": produit.nom,
        "description": produit.description,
        "commercant": "/api/commercants/"+idCommercant,
        "type": produit.type
      }
    var reponse = await axios.post('http://127.0.0.1:8000/api/produits',produitToAdd);
    console.log(reponse);
}

//return if produit is correctly delete
async function deleteProduit(id){
    var reponse = await axios.delete('http://127.0.0.1:8000/api/produits/'+id)
    if(reponse.status == 204){
        return true;
    }else{
        return false;
    }
}
export default {
    getAll,
    addProduit,
    deleteProduit
  };