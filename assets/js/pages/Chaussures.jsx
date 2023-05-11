import React, { useEffect, useState } from "react";
import produitsAPI from "../services/produitsAPI";
import { toast } from "react-toastify";
import Select from "../components/forms/Select";
import Axios from "axios";
import jwtDecode from "jwt-decode";
import usersAPI from "../services/usersAPI";
import Footer from '../components/Footer';

const Chaussures = ({id, history}) => {
  const token = localStorage.getItem('authToken');
  const [Produits, setProduits] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Panier,setPanier] = useState({
    Taille:"",
    Produits:"",
    user:"",
  });
  const decodeToken = async (token) => {
    try {
      const decoded = jwtDecode(token);
      fetchUser(decoded.username);
    } catch (err) {
      toast.error('Invalid token', err)
    }
  }

  // Permet d'aller récupérer les produits
  const fetchProduits = async () => {
    try {
      const data = await produitsAPI.findAll();
      setProduits(data);
      setLoading(false);
    } catch (error) {
      toast.error("Impossible de charger les clients");
    }
  };

  const fetchUser = async (email) => {
    try {
      const data = await usersAPI.findAll();
      const user = data.find(u => u.email === email);
      setUser(user);
    } catch (error) {
      toast.error('Impossible de charger les données utilisateurs | erreur :' + error)
    }
  }

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setPanier({ ...Panier, [name]: value });
    console.log(Panier)
  };
  // Au chargement du composant, on va chercher les produits
  useEffect(() => {
    fetchProduits();
    decodeToken(token);
  }, []);

  // Ajouter 
  const handleAddToCart = (id, userID) => {
    try {
      Axios.post('http://localhost:8000/api/paniers', {
        Produits:`/api/produits/${id}`,
        user:`/api/users/${userID}`,
        Taille: Panier.Taille
        })
        history.replace("/Panier")
        toast.success("Panier ajouté 👌")
    }catch(error){
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    toast.error(("errorOccured"))
    }
  };

  return (
    <>
    <br/>
    <div className="container pt-5">
      <div className="row row-cols-2 row-cols-md-4 g-6">   
      {Produits
      .map(produit => (
         <form  key={produit.id}> 
            <div className="col" style={{padding: 5}}>
                <div name="Produits"  class="card text-white bg-dark mb-2" >
                  <img src={produit.photo} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title"><u>Nom du produit </u>: {produit.nom_produit}</h5>
                    <p className="card-text">Prix : {produit.prix} €</p>
                    <p className="card-text">stock : {produit.stock}</p>
                    <Select
                        name="Taille"
                        label="Taille"
                        value={Panier.Taille}
                        onChange={handleChange}
                    >
                        <option>Choisir la taille</option>
                        <option>36</option>
                        <option>37</option>
                        <option>38</option>
                        <option>39</option>
                        <option>40</option>
                        <option>41</option>
                        <option>42</option>
                        <option>43</option>
                        <option>44</option>
                        <option>45</option>
                        <option>46</option>
                        <option>47</option>
                    </Select>
                    <br/>
                    <button onClick={() => handleAddToCart(produit.id, user.id)} type="submit" className="btn btn-primary">Ajouter au panier</button>
                    <p className="text-muted">Reference du produit : {produit.id}</p>
                </div>
                </div>
            </div>
          </form>
        ))} 
    </div>
    </div>
    <Footer/>
    </>
  )
};
  
export default Chaussures;