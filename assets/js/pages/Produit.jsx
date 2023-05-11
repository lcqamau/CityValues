import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import produitsAPI from "../services/produitsAPI";
import { toast } from "react-toastify";
import axios from "axios";
import Footer from '../components/Footer';

const ProduitPage = ({ history, match }) => {
  const { id = "new" } = match.params;

  const [Produit, setProduit] = useState({
    nom_produit: "",
    prix:'' ,
    stock:'',
    photo:"",
  });
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({
    nom_produit: "",
    prix: "",
    stock: "",
    photo:"",
  });
  const [loading, setLoading] = useState(false);

  // Récupération d'une facture
  const fetchProduits = async id => {
    try {
      const produit = await produitsAPI.find(id);
      setProduit(produit);
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
    } else {
      setProduit({
        nom_produit: "",
        prix: '',
        stock: '',
        photo: "",
      });
      setEditing(false);
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
        axios.post('http://localhost:8000/api/produits', {
          nom_produit:Produit.nom_produit,
          prix: parseInt(Produit.prix),
          stock: parseInt(Produit.stock),
          photo: Produit.photo
        })
        history.replace("/stock")
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
      {!loading && (
        <form className="form-container" onSubmit={handleSubmit}>
          <Field
            className="form-field"
            name="nom_produit"
            placeholder="Nom du produit"
            label="Nom du produit"
            onChange={handleChange}
            value={Produit.nom_produit}
            error={errors.nom_produit}
          />
          <div className="form-group">
            <div className="form-field-row">
            <Field
              className="form-field"
              name="prix"
              type="number"
              placeholder="Prix du produit"
              label="Prix du produit"
              onChange={handleChange}
              value={Produit.prix}
              error={errors.prix}
              inputMode="numeric"
              pattern="[0-9]*"
            />
              <Field
                className="form-field"
                name="stock"
                type="number"
                placeholder="Stock"
                label="Stock"
                onChange={handleChange}
                value={Produit.stock}
                error={errors.stock}
              />
            </div>
            <Field
              className="form-field"
              name="photo"
              placeholder="photo du produit"
              label="photo du produit"
              onChange={handleChange}
              value={Produit.photo}
              error={errors.photo}
            />
          </div>
          <div className="form-group form-actions">
            <button type="submit" style={{ marginTop: "40px" }}  className="btn btn-success">
              Enregistrer
            </button>
            <Link to="/stock" className="btn btn-link">
              Retour aux produits
            </Link>
          </div>
        </form>
      )}
    </>
  );
};

export default ProduitPage;