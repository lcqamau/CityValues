import axios from "axios";
import produitAPI from "./produitAPI";
import usersAPI from "./usersAPI";

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
async function getOneEchange(idEchange){
    try{
        var reponse = await axios.get('http://127.0.0.1:8000/api/echanges/'+idEchange);
        if(reponse.status == 200){
            return reponse.data;
        }
    }catch(e){
        return {}
    }
}
//Récupère tous les échanges sauf ceux qui concerne l'utilisateur
async function getAllEchange(idUtilisateur){
    var echanges = []
    try{
        //First : on récupére notre user
        var reponse = await axios.get('http://127.0.0.1:8000/api/utilisateurs/'+idUtilisateur)
        var user = reponse.data;
        //Second : on récupére notre    
        if(reponse.status == 200){
            reponse = await axios.get('http://127.0.0.1:8000/api/echanges/');
            var echangesTemp = reponse.data["hydra:member"];
            //Third : on check que l'utilisateur ne corresponds pas à celui qui fait l'appel API 
            for(var echange of echangesTemp){
                reponse = await axios.get('http://127.0.0.1:8000'+echange["produitEchange"]);
                echange["produitEchange"] = reponse.data;
                reponse = await axios.get('http://127.0.0.1:8000' + echange.utilisateur);
                if(reponse.data["id"] != idUtilisateur){

                    echanges.push(echange);
                }
            }
        }
        console.log(echanges)
        return echanges;
    }catch(e){
        return echanges;
    }
}
async function deleteEchange(idEchange){
    //First on récup l'echange
    var echange = await getOneEchange(idEchange);
    //Second on delete le produit associés
    console.log(idEchange);
    var reponse = await axios.delete('http://127.0.0.1:8000/api/echanges/'+idEchange);
    //Third on delete l'échange
    if(reponse == 204){
        return true;
    }
    else{
        return false;
    }
}
async function addDemandeEchange(idEchange,produit){
    console.log('in')
    //First : POST le produit 
    var reponse = await axios.post('http://127.0.0.1:8000/api/produits',produit);
    var urlProduit = reponse.data["@id"];
    //Second : On récupére notre echange
    var echange = await getOneEchange(idEchange);
    var urlEchange = echange["@id"];
    var reponse = await axios.get('http://127.0.0.1:8000/api/utilisateurs/'+localStorage.getItem("id"))
    var urlUser = reponse.data["@id"];
    console.log(urlProduit);
    console.log(urlEchange);
    console.log(urlUser);
    const demandeEchange = {
        "estAccepte": false,
        "utilisateur": urlUser,
        "echange": urlEchange,
        "produit": urlProduit
    }
    var reponse = await axios.post('http://127.0.0.1:8000/api/demande_echanges',demandeEchange)
    console.log(reponse);
}
//Retourne toutes les demandes d'échanges d'un échange
async function getDemandeEchange(idEchange){
    var listToReturn = [];

    console.log('idEchange => ' + idEchange)

    try{
        var reponse = await axios.get('http://127.0.0.1:8000/api/demande_echanges');
        console.log("qzd")
        console.log(reponse)

        if(reponse.status == 200){
        var demandeEchanges = reponse.data["hydra:member"];
        console.log(demandeEchanges)

        //Parcout de la liste des demandeEchanges
        for(var dE of demandeEchanges){
            console.log(dE)
            var reponse = await axios.get('http://127.0.0.1:8000'+dE["echange"]);
            var echange = reponse.data
            console.log(echange)
            //Si les échanges correspondent alors
            if(echange["id"] == idEchange && !dE["estAccepte"]){
                //On récupére le produit associé
                reponse = await axios.get('http://127.0.0.1:8000'+dE["produit"]);
                console.log(reponse)
                var produit =  reponse.data;
                //On remplace les url par les vrais données
                var tempDemandeEchange = dE;
                console.log("tempEchange")
                console.log(tempDemandeEchange)
                tempDemandeEchange["echange"]=echange;
                tempDemandeEchange["produit"]=produit;
                listToReturn.push(tempDemandeEchange)
                }
            } 
        }
        return listToReturn;
    }
    catch(e){
        console.log("erreur" +e)
        return [];
    }

}
//PUT sur le statuts d'une demande d'échange
async function changeStatutsDemandeEchange(idEchange,idDemandeEchange,estAccepte,statuts){
    var reponse = await axios.put('http://127.0.0.1:8000/api/demande_echanges/'+idDemandeEchange, {"estAccepte":estAccepte})
    reponse = await axios.put('http://127.0.0.1:8000/api/echanges/'+idEchange, {"statuts":statuts})

    console.log(reponse);
}

//DEL les demandes d'echanges et change le statuts PUT 
async function clotureEchange(idEchange){
    var reponse = await axios.get('http://127.0.0.1:8000/api/echanges/'+idEchange);
    var echange = reponse.data;
    console.log("qzd")
    console.log(echange);


}
export default {
    addEchange,
    getEchange,
    getAllEchange,
    addDemandeEchange,
    getOneEchange,
    deleteEchange,
    getDemandeEchange,
    changeStatutsDemandeEchange,
    clotureEchange
  };