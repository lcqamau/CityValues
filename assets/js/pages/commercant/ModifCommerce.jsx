import React from 'react';
import Field from '../../components/forms/Field';
import AuthContext from '../../contexts/AuthContext';
import { useContext,useState } from 'react';
import { toast } from 'react-toastify';

function ModifCommerce() {
    const { setIsAuthenticated } = useContext(AuthContext);

    const [produit, setProduit] = useState({
        nom:"",
        description:""
    });
    const [error, setError] = useState("");
    //Gestion des champs
    const handleChange = ({currentTarget}) =>{
        console.log(currentTarget)
        const {value, name} = currentTarget;
       setProduit({...produit, [name]: value});

    };

    const listType = ['ferme','commerce','particulier']

    //Gestion du submit
    const handleSubmit = async event => {
            event.preventDefault();
            try{
             await AuthAPI.authenticate(credentials);
             setError("")
             setIsAuthenticated(true);
             toast.success("Vous etes desormais connecté !");
             history.replace("/");
            }catch{
                setError("Aucun compte ne possède cette adresse email ou alors les informations ne correspondent pas !");
                toast.error("Une erreur est survenue");
            }
    
     };

    return (
    <>
        <div className="container pt-5">
            <h1>Modifier votre commerce 🏠</h1>

            <form onSubmit={handleSubmit}>
            <div class="mb-3">
                <label for="Nom" class="form-label">Adresse *</label>
                <input type="text" class="form-control" id="Nom"  />
            </div>
            <div class="mb-3">
                <select class="form-select" aria-label="Default select example">
                    <option selected>Choissisez un type de commerce *</option>
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
                <div className="form-group"><button type="submit" className="btn btn-success">Modifier</button></div>
            </form>            
        </div>

    </>
    )
}
export default ModifCommerce;