import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import { Link } from "react-router-dom";
import produitsAPI from "../services/produitsAPI";
import { toast } from "react-toastify";
import FormContentLoader from "../components/loaders/FormContentLoader";

const ProduitPage = ({ history, match }) => {
  const { id = "new" } = match.params;

  const [Produit, setProduit] = useState({
    nom_produit: "",
    prix: "",
    stock: "",
    photo: "",
  });
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({
    nom_produit: "",
    prix: "",
    stock: "",
    photo: "",
  });
  const [loading, setLoading] = useState(true);

  // Récupération d'une facture
  const fetchProduits = async id => {
    try {
      const { nom_produit, stock, prix, photo  } = await produitsAPI.find(id);
      setProduifetchProduits({ nom_produit, stock, prix,  photo});
      setLoading(false);
    } catch (error) {
      toast.error("Impossible de charger la facture demandée");
      history.replace("/stock");
    }
  };

  // Récupération de la bonne facture quand l'identifiant de l'URL change
  useEffect(() => {
    if (id !== "new") {
      setLoading(true);
      setEditing(true);
      fetchProduits(id);
    }
  }, [id]);
  // Gestion des changements des inputs dans le formulaire
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setProduit({ ...Produit, [name]: value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async event => {
    event.preventDefault();

    try {
      if (editing) {
        await produitsAPI.update(id, Produit);
        toast.success("La facture a bien été modifiée");
        history.replace("/stock");
      } else {
        await produitsAPI.create(Produit);
        toast.success("La facture a bien été enregistrée");
        history.replace("/stock");
      }
    } catch ({ response }) {
      const { violations } = response.data;

      if (violations) {
        const apiErrors = {};
        violations.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });

        setErrors(apiErrors);
        toast.error("Des erreurs dans votre formulaire");
      }
    }
  };

  return (
    <>
      {(editing && <h1>Modification d'une facture</h1>) || (
        <h1>Création d'une facture</h1>
      )}
      {loading && <FormContentLoader />}

      {!loading && (
        <form onSubmit={handleSubmit}>
          <Field
            name="nom_produit"
            placeholder="Montant de la facture"
            label="Montant"
            onChange={handleChange}
            value={Produit.nom_produit}
            error={errors.nom_produit}
          />
           <Field
            name="prix"
            type="number"
            placeholder="Montant de la facture"
            label="Montant"
            onChange={handleChange}
            value={Produit.prix}
            error={errors.prix}
          />
        <Field
            name="stock"
            type="number"
            placeholder="Montant de la facture"
            label="Montant"
            onChange={handleChange}
            value={Produit.stock}
            error={errors.stock}
          />
        <Field
            name="photo"
            placeholder="Montant de la facture"
            label="Montant"
            onChange={handleChange}
            value={Produit.photo}
            error={errors.photo}
          />

        
          <div className="form-group">
            <button type="submit" className="btn btn-success">
              Enregistrer
            </button>
            <Link to="/stock" className="btn btn-link">
              Retour aux factures
            </Link>
          </div>
        </form>
      )}
    </>
  );
};

export default ProduitPage;