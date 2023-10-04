import React, { useEffect } from 'react';
import Field from '../../components/forms/Field';
import AuthContext from '../../contexts/AuthContext';
import produitAPI from '../../services/produitAPI';
import { useContext,useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import FormContentLoader from '../../components/loaders/FormContentLoader';
function VoirEchange() {

    //Creation des useState
    const [load, setLoad] = useState(true);
    const [produits, setProduits] = useState([]);
    const [selectType, setSelectType] = useState([]);
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
        let produitBis = await produitAPI.getAll();
        console.log("nouveau produit");
        setProduits(produitBis);
        let selectType = getSelectType(produitBis);
        if(filter != "null"){
            filterListOfProduit(produitBis);
        }
        setLoad(false);
    }

     useEffect(()=>{

        fetchData(filter);
    },[filter])

    return (
    <>  
            <div className="container pt-5 text-center">
            <h1 class="border-bottom p-3">Voici la liste de vos produits 🥔🍅🥬 </h1>
            <select class="form-select" aria-label="Default select example" onChange={handleFilter}>
                        <option selected value="null">Selectionner un filtre</option>
                        {selectType.map((type, index) => {
                            
                                return (
                                    <option value={type}>{type}</option>
                                );
                        })}
            </select>
        {load && 
        <>
            <FormContentLoader></FormContentLoader>
        </>
        ||
        <>

                    {produits.length == 0 && 
                    <>
                    <h2>Ohhhh non, vôtre liste de produit est vide 🥲</h2>
                    <Link to="/ajout-produit" className="btn btn-success">Ajoute un produit !</Link>

                    </>
                    ||
                    <>

                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Photo</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Description</th>
                            <th scope="col">Type</th>
                            <th scope="colo">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produits.map((produit, index) => {
                                return (
                                    <tr>
                                        <td>TODO</td>
                                        <td>{produit.nom}</td>
                                        <td>{produit.description}</td>
                                        <td>{produit.type}</td>
                                        <td><a class="px-2" onClick={()=> deleteProduit(produit.id)}>🔧</a><a onClick={()=> deleteProduit(produit.id)}>🗑️</a></td>
                                    </tr>
                                );
                            })}
                         </tbody>
                     </table>        
                    </>
}   
 
        </>
        }
        </div>


        </>
    )
}
export default VoirEchange;