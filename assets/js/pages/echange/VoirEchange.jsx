import React, { useEffect } from 'react';
import Field from '../../components/forms/Field';
import AuthContext from '../../contexts/AuthContext';
import echangeAPI from '../../services/echangeAPI';
import { useContext,useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import FormContentLoader from '../../components/loaders/FormContentLoader';
import Card from '../../components/Card';
function VoirEchange({history}) {

    //Creation des useState
    const [load, setLoad] = useState(true);
    const [echanges, setEchange] = useState([]);
    const [filter, setFilter] = useState("null");
    
    //Gestion du submit
    const handleFilter = async event => {
            console.log("changement de filtre")
            event.preventDefault();
            console.log(event.target.value)
            setFilter(event.target.value);
    
     };
     //Mets à jour la liste des filtres en fonction de ce qu'il y a en base de donneés
    function getSelectType(produitsBis){
        let selectTypeTemp = [];
        produitsBis.map((produit, index) => {
            if(!selectTypeTemp.includes(produit.type)){
                selectTypeTemp.push(produit.type);
            }
        });
        console.log(selectTypeTemp);
        setSelectType(selectTypeTemp);
     };
     //Filter une liste de Produit
     function filterListOfProduit(produits){
        var listBis = [];
        produits.map((p, index) => {
            if(p.type==filter){
                listBis.push(p);
            }
        });
        setProduits(listBis);
     };
     //Permet de supprimer un produit
     async function deleteProduit(id){
        var reponse = await echangeAPI.deleteEchange(id)
        if(reponse){
            toast.success("Echange correctement supprimé");
            await fetchData(filter);
        }else{
            toast.success("Erreur dans la suppression du produit")

        }
     }

     //Permet de clôturer un ticket et d'ajouter les points aux différents User
     async function clotureEchange(id){
        setLoad(true);
        var reponse = await echangeAPI.clotureEchange(id)
        if(reponse){
            toast.success("Bravo ! Vous avez gagné 10 points 🎉");
            await fetchData(filter);
        }else{
            toast.success("Erreur dans la suppression du produit");
        }
        setLoad(false);
     }

     async function fetchData(filter) {
        setLoad(true);
        let echangesBis = await echangeAPI.getEchange(localStorage.getItem("id"));
        setEchange(echangesBis);
        if(filter != "null"){
        }
        console.log('fin du fetch')
        setLoad(false);
    }

    
    useEffect(()=>{
        fetchData(filter);
    },[filter])

    return (
    <>  
            <div className="container pt-5 text-center">
            <h1 class="border-bottom p-3">Voici la liste de vos échanges 📚</h1>
        {load && 
        <>
            <FormContentLoader></FormContentLoader>
        </>
        ||
        <>

                    {echanges.length == 0 && 
                    <>
                    <h2>Ohhhh non, vous n'avez pas encore d'échange 🥲</h2>
                    <Link to="/ajout-echange" className="btn btn-success">Fait un échange !</Link>

                    </>
                    ||
                    <>
                    <div class='container-fluid'>
                        {echanges.map((echange, index) => {
                                    return (
                                        <Card titre={echange["produitEchange"]["nom"]} 
                                        description={echange["produitEchange"]["description"]} 
                                        type={echange["produitEchange"]["type"]}
                                        onClickDemande={()=>history.replace('/voir-demande?id='+echange["id"])}
                                        onClickCloturer={()=>clotureEchange(echange["id"])}
                                        nombreDeDemande={echange["demandeEchange"].length}
                                        statuts={echange["statuts"]}
                                        onClickSupprimer={()=>deleteProduit(echange["id"])}

                                        ></Card>
                                    );
                                })}
                    </div>
                    </>
}   
 
        </>
        }
        </div>


        </>
    )
}
export default VoirEchange;