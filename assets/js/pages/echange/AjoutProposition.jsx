import Field from '../../components/forms/Field';
import AuthContext from '../../contexts/AuthContext';
import { useContext,useState } from 'react';
import { toast } from 'react-toastify';
import echangeAPI from '../../services/echangeAPI';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'


function AjoutProposition() {
    const { setIsAuthenticated } = useContext(AuthContext);
    const search = useLocation().search
    const searchParams = new URLSearchParams(search)
    //On récupére l'id de l'échange cliquer via l'URL 
    const echangeId = searchParams.get('id')
    /*
    STEP 1 : Renseigner le produit 
    STEP 2 : Ajouter le produit 
    STEP 3 : Ajouter la demande
    */
    const [produit, setProduit] = useState({
        nom:"",
        description:"",
        type:""
    });
    const [error, setError] = useState("");
    //Gestion des champs
    const handleChange = ({currentTarget}) =>{
       setProduit({...produit, [currentTarget.id]: currentTarget.value});
       console.log(produit)
    };

    const listType = ['livre','jeu de société','vétement','jouet','informatique']

    //Restaure les valeurs du formulaire
    function restoreValues(){
        document.getElementById('nom').value = '';
        document.getElementById('description').value = '';
        document.getElementById('type').value = 'null';
        setProduit({
            nom:"",
            description:"",
            type:""
        })
    }
    //Gestion du submit
    const handleSubmit = async event => {
            event.preventDefault();
            try{
                //Les vérif sur les champs 
                if(produit.nom == "" || produit.nom.length > 255){
                    toast.error('Le champ nom est vide ou supérieur à 255 caractères');
                    return;
                }else if(produit.description.length > 255){
                    toast.error('Le champ description est supérieur à 255 caractères');
                    return;
                }else if(produit.type == ""){
                    toast.error('Le type du produit n\'est pas renseigné');
                    return;
                }
                //Envoie à l'api
                await echangeAPI.addDemandeEchange(echangeId,produit);
                toast.success("Proposition envoyée !");
                restoreValues();


            }catch{
                setError("Aucun compte ne possède cette adresse email ou alors les informations ne correspondent pas !");
                toast.error("Une erreur est survenue");
            }
    
     };

    return (
    <>
        <div className="container pt-5">
            <h1>Faire une nouvelle proposition</h1>

            <form onSubmit={handleSubmit}>
            <div class="mb-3">
                <label for="Nom" class="form-label">Nom du produit *</label>
                <input type="text" class="form-control" onChange={handleChange} id="nom"  />
            </div>
            <div class="mb-3">
                <label for="Adresse" class="form-label" >Description du produit</label>

                <input type="text" class="form-control" onChange={handleChange} id="description" placeholder="" /><br/>

                <select id="type" class="form-select" aria-label="Default select example" onChange={handleChange}>
                    <option value="null" selected disabled>Choissisez un type de produit *</option>
                    {listType.map((type, index) => {
                        return (
                                <option value={type}>{type}</option>
                        );
                    })}
                </select>
            </div>
            <div class="mb-3">
                <p>* champs obligatoires</p>
            </div>
                <div className="form-group"><button type="submit" className="btn btn-success">Envoie de l'échange</button></div>
            </form>            
        </div>

    </>
    )
}
export default AjoutProposition;