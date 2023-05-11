import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import usersAPI from '../services/usersAPI';
import Axios from 'axios';
import "../../styles/app.css"
import jwtDecode from "jwt-decode";
import { toast } from 'react-toastify';
import panierAPI from '../services/panierAPI';

const Panier = (match) => {
    const [Panier,setPanier] = useState([])
    const token = localStorage.getItem('authToken');
    const [user, setUser] = useState([]);
  
  
    const decodeToken = async (token) => {
      try {
        const decoded = jwtDecode(token);
        fechUser(decoded.username);
      } catch (err) {
        toast.error('Invalid token', err)
      }
    }

    const fechUser = async (email) => {
      try {
        const data = await usersAPI.findAll();
        const user = data.find(u => u.email === email);
        console.log(user);
        setUser(user);
        Paniers(user.id)
      } catch (error) {
        toast.error('Impossible de charger les données utilisateurs | erreur :' + error)
      }
    }
    
    const Paniers = async (userId) => {
      try {
        const data = await panierAPI.findAll();
        const Panier = data.filter(p => p.user=== "/api/users/" + userId);
        setPanier(Panier)
        console.log(Panier);
      } catch (error) {
        console.log('Impossible de charger vos commandes | erreur : ' + error )
      }
    }

    function calculerPrixTotal() {
      const prixTotal = Panier.filter((item) => item.user === `/api/users/${user.id}`)
        .reduce((total, item) => total + item.Produits.prix, 0);
      return prixTotal;
    }

    const handleDelete = (itemId) => {
      Axios
        .delete(`/api/paniers/${itemId}`)
        location.reload()
        .catch((error) => {
          console.log(error);
        });
    };

    useEffect(() => {
        Paniers();
        decodeToken(token);
      }, []);


    return(
        <>
        <div className="container pt-5">
           <h2> Voici votre panier {user.FirstName} {user.LastName}</h2>
          {Panier.length === 0 && <p>Votre panier est vide</p>}
          {Panier.length > 0 && (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>photo</th>
                    <th>nom du Produits</th>
                    <th>prix</th>
                    
                  </tr>
                </thead>
                  <tbody>
                    {Panier
                    .map(panier => (
                      <tr key={panier.id}>
                        <td><img src={panier.Produits.photo}  id="photopanier" className="card-img-top" alt="..."/></td>
                        <td>{panier.Produits.nom_produit}</td>
                        <td>{panier.Produits.prix}</td>
                        <td><button class="btn btn-primary" onClick={() => handleDelete(panier.id)}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
              </table>
          )}
          <button onClick={() => alert(`Le prix total est de ${calculerPrixTotal()} euros`)}>
                  Payer
          </button>
          <button onClick={() => clearPanier()}>Clear Cart</button>
        </div>
       
        </>
    )
}
export default Panier