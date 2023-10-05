import axios from "axios";

//Return tous les produits de la base de données
async function getAll(){
    var reponse = await axios.get('http://127.0.0.1:8000/api/produits');
    if(reponse.status == 200){
        return reponse.data["hydra:member"];
    }else{
        return [];
    }
}

async function getOneProduit(idProduit){
    var reponse = await axios.get('http://127.0.0.1:8000'+idProduit);
    if(reponse.status == 200){
        return reponse.data;
    }else{
        return {};
    }
}

//Return tous les produits de la base de données
async function getAllByCommercant(idCommercant){
    var reponse = await axios.get('http://127.0.0.1:8000/api/commercants/'+idCommercant);
    var listToReturn = [];
    if(reponse.status == 200){
        console.log(reponse.data);
        var urlProduit = reponse.data["produits"];
        for(let url of urlProduit){
            console.log(url);
            var produit = await getOneProduit(url);
            listToReturn.push(produit);
        }
        return listToReturn;
    }else{
        return listToReturn;
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
    deleteProduit,
    getAllByCommercant
  };