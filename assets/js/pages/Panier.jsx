import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import "../../styles/app.css"

const Panier = (match) => {
    const [Panier,setPanier] = useState([])

    const Paniers = async () => {
      try {
        const data = await Axios
          .get("http://localhost:8000/api/paniers")
          .then((response) => setPanier(response.data["hydra:member"]))
      }catch (error) {
        console.log(error);
      }
    }

    function calculerPrixTotal() {
      const prixTotal = Panier.reduce((total, panier) => {
        return total + panier.Produits.prix;
      }, 0);
      return prixTotal;
    }

    const handleDelete = (itemId) => {
      Axios
        .delete(`/api/panier/${itemId}`)
        .then((response) => {
          setCartItems(cartItems.filter((item) => item.id !== itemId));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const clearPanier = () => {
      Axios.delete('http://localhost:8000/api/paniers').then(() => {
        setPanier([]);
      });
    };

    useEffect(() => {
        Paniers();
      }, []);


    return(
        <>
        {Panier.length === 0 && <p>Your cart is empty.</p>}
        {Panier.length > 0 && (
             <table className="table table-hover">
              <thead>
                <tr>
                  <th>photo</th>
                  <th>nom du building</th>
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
        <button onClick={() => clearPanier}>Clear Cart</button>
        </>
    )
}
export default Panier