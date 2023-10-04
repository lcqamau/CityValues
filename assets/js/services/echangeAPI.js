import axios from "axios";

async function addEchange(produit,idUtilisateur){
    console.log("addEchange")
    //First : post le produit 
    const produitToAdd = {
        "nom": produit.nom,
        "description": produit.description,
        "type": produit.type
      }
    var reponse = await axios.post('http://127.0.0.1:8000/api/produits',produitToAdd);
    //Second : post l'echange
    if(reponse.status == 201){
        var idProduit = reponse.data["@id"]
        const echange = {
            "statuts" : "en attente",
            "utilisateur" :  "/api/utilisateurs/"+idUtilisateur,
            "demandeEchange" : [],
            "produitEchange" :  idProduit
        }
        reponse = await axios.post('http://127.0.0.1:8000/api/echanges',echange);
        console.log(reponse)
    }
}


export default {
    addEchange,
  };