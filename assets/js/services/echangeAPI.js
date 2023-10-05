import axios from "axios";
import produitAPI from "./produitAPI";

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

//Retourne tous les échanges d'un utilisateur
async function getEchange(idUtilisateur){
    var echanges = []
    try{
        //First : on récupére notre user
        var reponse = await axios.get('http://127.0.0.1:8000/api/utilisateurs/'+idUtilisateur)
        var user = reponse.data;
        //Second : on récupére notre    
        if(reponse.status == 200){
            var urlEchanges = reponse.data["echanges"];
            for(let url of urlEchanges){
                reponse = await axios.get('http://127.0.0.1:8000'+url);
                var echange = reponse.data;
                //Third : on récupére le produit associé
                reponse = await axios.get('http://127.0.0.1:8000'+reponse.data["produitEchange"]);
                echange["produitEchange"] = reponse.data;
                
                echanges.push(echange);
            }
        }
        return echanges;
    }catch(e){
        return echanges;
    }
    
}


export default {
    addEchange,
    getEchange
  };