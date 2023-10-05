import { useContext,useState } from 'react';
import { toast } from 'react-toastify';
import echangeAPI from '../services/echangeAPI';
import React, { useEffect } from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

function Echange({history}) {
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
         var reponse = await produitAPI.deleteProduit(id);
         if(reponse){
             toast.success("Produit correctement supprimé")
             await fetchData(filter);
         }else{
             toast.success("Erreur dans la suppression du produit")
 
         }
         console.log("delete du produit "+ id )
      }
      async function fetchData(filter) {
         setLoad(true);
         let echangesBis = await echangeAPI.getAllEchange(localStorage.getItem("id"));
         setEchange(echangesBis);
         if(filter != "null"){
             filterListOfProduit(produitBis);
         }
         setLoad(false);
     }
 
      useEffect(()=>{
         fetchData(filter);

     },[filter]);

 
    return (
        <>  
        <div class="container text-center">
            <h1>Bienvenue sur la section échange</h1>
            <p>Ici, vous pouvez voir les échanges en attente sur le site et faire des propositions de produits</p>
            <p>Les échanges permettent d'acquérir des points sur le site, alors n'hésitez pas !</p>
            <div class='container-fluid'>
                        {echanges.map((echange, index) => {
                                    console.log(echange["demandeEchange"].length)
                                    return (
                                            <Card titre={echange["produitEchange"]["nom"]} 
                                                description={echange["produitEchange"]["description"]} 
                                                type={echange["produitEchange"]["type"]}
                                                nombreDeDemande={echange["demandeEchange"].length}
                                                statuts={echange["statuts"]}
                                                proposition={true}
                                                link={'/ajout-proposition?id=3'}
                                                onClickProposition={()=>history.replace('/ajout-proposition?id='+echange["id"])}
                                                ></Card>                                  
                                    );
                                })}
                    </div>
        </div>

        </>
    )
}
export default Echange;