import React, { useEffect } from 'react';
import Field from '../../components/forms/Field';
import AuthContext from '../../contexts/AuthContext';
import echangeAPI from '../../services/echangeAPI';
import { useContext,useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import FormContentLoader from '../../components/loaders/FormContentLoader';
import Card from '../../components/Card';
import { useLocation } from 'react-router-dom'

function VoirDemande({history}) {
    const search = useLocation().search
    const searchParams = new URLSearchParams(search)
    const idEchange = searchParams.get('id')
    console.log("idEchange const " + idEchange);

    //Creation des useState
    const [load, setLoad] = useState(true);
    const [demandes, setDemandes] = useState([]);
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
     
     async function fetchData(filter) {
        setLoad(true);
        let demandeEchanges = await echangeAPI.getDemandeEchange(idEchange);
        console.log(demandeEchanges)
        setDemandes(demandeEchanges);
        if(filter != "null"){
            filterListOfProduit(produitBis);
        }
        setLoad(false);
    }

    async function accepteProposition(idProposition){
        alert('accepte !')
        var reponse = await echangeAPI.changeStatutsDemandeEchange(idEchange,idProposition,true,"confirmer");
    }

     useEffect(()=>{
        fetchData(filter);
    },[filter])

    return (
    <>  
            <div className="container pt-5 text-center">
            <h1 class="border-bottom p-3">Voici la liste de vos demandes d'échange 📚</h1>
        {load && 
        <>
            <FormContentLoader></FormContentLoader>
        </>
        ||
        <>

                    {demandes.length == 0 && 
                    <>
                    <h2>Ohhhh non, vous n'avez pas encore d'échange 🥲</h2>
                    <Link to="/ajout-echange" className="btn btn-success">Fait un échange !</Link>

                    </>
                    ||
                    <>
                    <div class='container-fluid'>
                        {demandes.map((demande, index) => {

                                    return (
                                        
                                        <Card titre={demande["produit"]["nom"]} 
                                        description={demande["produit"]["description"]} 
                                        type={demande["produit"]["type"]}
                                        statuts={demande["statuts"]}
                                        demande={true}
                                        onClickAccepter={()=>accepteProposition(demande["id"])}

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
export default VoirDemande;