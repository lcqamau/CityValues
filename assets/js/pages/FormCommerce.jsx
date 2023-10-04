import React from 'react';
import { useState } from 'react';

function Commerce() {
    const [adresse, setAdresse] = useState('');
    const [produits, setProduits] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Envoyer les données au backend (par exemple, via une API)
      const data = { adresse, produits };
      console.log(data); // Affichez les données pour le moment
    };
  
    return (
        <>
      <div>
        <h1>Formulaire du commerçant</h1>
        <form onSubmit={handleSubmit}>
          
          <div class="mb-3">
            <label for="Nom" class="form-label">Nom du commerce</label>
            <input type="text" class="form-control" id="Nom"  />
        </div>
        <div class="mb-3">
            <label for="Adresse" class="form-label">Adresse du commerce</label>
            <input type="text" class="form-control" id="Adresse" placeholder="XX rue XXXX" />
        </div>
          <button type="submit">Enregistrer</button>
        </form>
      </div>
      </>
    );
}
export default Commerce;