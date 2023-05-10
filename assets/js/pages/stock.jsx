import React from 'react';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import produitsAPI from "../services/produitsAPI";
import Axios from 'axios';
const stock = ({}) => {
    const [Produits, setProduits] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProduits = async () => {
        try {
          const data = await produitsAPI.findAll();
          setProduits(data);
          setLoading(false);
        } catch (error) {
          toast.error("Impossible de charger les produits");
        }
      };

    const deleteProduit = (id, stock) => {
        if (stock < 1 ){
            Axios.delete(`http://localhost:8000/api/produits/${id}`)
            location.reload();
        }else{
        stock = stock - 1
        Axios.put(`http://localhost:8000/api/produits/${id}`, {
            stock : stock
        })
        location.reload();
    }        
    }

    const updateProduit = (id, stock) => {
        stock = stock + 1
        Axios.put(`http://localhost:8000/api/produits/${id}`, {
            stock : stock
        })
        location.reload();
    }

    useEffect(() => {
    fetchProduits();
    },);

    return (
        <>
        <Link to="/Produit/new" className="btn btn-warning">
        Ajouter un produit
        </Link>
            <table className="table align-items-center mb-0">
                <thead>
                <tr>
                    <th>Nom du produit</th>
                    <th>Stock</th>
                    <th>Prix du produit</th>
                    <th>Ajouter</th>
                    <th>Supprimer</th>
                </tr>
                </thead>
                <tbody>
                {Produits.map(produit =>
                    <tr key={produit.id} className="table-active">
                        <td>  
                            <Link to={"/Produit/" + produit.id}>
                                {produit.nom_produit}
                            </Link>
                        </td>
                        <td>{produit.stock}</td>
                        <td>{produit.prix}</td>
                        <td><button type="button"  onClick={() => updateProduit(produit.id, produit.stock)} className="btn btn-danger"> + </button></td>
                        <td><button type="button"  onClick={() => deleteProduit(produit.id, produit.stock)} className="btn btn-danger"> - </button></td>
                    </tr>
                    )}   
                </tbody>
            </table>
        </>
    )
}

export default stock 