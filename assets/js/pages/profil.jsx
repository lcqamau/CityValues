import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Component } from 'react';
import Axios from 'axios';
import "../../styles/app.css"
import jwtDecode from "jwt-decode";
import { toast } from 'react-toastify';
import usersAPI from '../services/usersAPI';
import DeliveryAPI from '../services/DeliveryAPI';
import '../../styles/delivery.css';

const ProfilPage = (match) => {
  const token = localStorage.getItem('authToken');
  const [user, setUser] = useState([]);
  const [userDeliverys, setUserDeliverys] = useState([]);


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
      fetchUserDelivery(user.id);
    } catch (error) {
      toast.error('Impossible de charger les données utilisateurs | erreur :' + error)
    }
  }
  
  const fetchUserDelivery = async (userId) => {
    try {
      const data = await DeliveryAPI.findAll(userId);
      const userDeliverys = data.filter(u => u.user=== "/api/users/" + userId);
      setUserDeliverys(userDeliverys)
      console.log(userDeliverys);
    } catch (error) {
      console.log('Impossible de charger vos commandes | erreur : ' + error )
    }
  }

  useEffect(() => {
    decodeToken(token);
  }, []);

    return(
        <>
            <div className="profil-container">
              <h1>Bonjour {user.FirstName} {user.LastName}</h1>
            </div>
            <div className="delivery-wrapper">
              <h2>Détails des livraisons</h2>
              {userDeliverys
              .map(userDelivery => (
                <div className="delivery-container"  key={userDelivery.id}>
                  <span id="delivery-id">Numéros de livraison : {userDelivery.id}</span>
                  <span id="delivery-etat">état de la livraison : {userDelivery.Etat}</span>
                </div>
              ))}
            </div>
        </>
    )   
}
export default ProfilPage