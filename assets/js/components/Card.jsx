
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const Card = ({titre,description,type = "",nombreDeDemande = 0,statuts, demande=false,proposition=false,onClickModifer,onClickCloturer,onClickSupprimer,onClickProposition,onClickDemande,onClickAccepter,onClickRefuser}) => {
    
    return ( 
        <>
            <div class="card p-3 m-5" style={{width : 18 + 'rem;'}}>
            <div class="card-body">
                <h5 class="card-title">
                
                Statuts : {statuts == "en attente" && 
                <>
                <span class="badge bg-warning m-1">{statuts}</span>
                </>
                || statuts == "confirmer" && 
                <>
                <span class="badge bg-success m-1">{statuts}</span>

                </>
                }
                    
                    {nombreDeDemande > 0 && !proposition && statuts == "en attente" && <>
                    <button type="button button-sm" class="m-2 btn btn-primary">
                    <span class="badge badge-light" onClick={onClickDemande}>{nombreDeDemande}</span>
                    </button>
         
                </>}
                <br/>
                Titre : {titre} 
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">{type}</h6>
                <p class="card-text">{description}</p>
                <p>actions :</p>
                {proposition && 
                <>
                <a onClick={onClickProposition} class="card-link">Faire une proposition</a>
                </>
                ||
                demande && 
                <>
                <a onClick={onClickAccepter} class="card-link">Accepter</a>
                <a onClick={onClickRefuser} class="card-link">Refuser</a>
                </>
                ||
                statuts == "confirmer" && 
                <>
                    <a onClick={onClickCloturer} class="card-link">Cloturer ✅</a>
                </>
                ||
                <>
                <a onClick={onClickModifer} class="card-link">Modifier</a>
                <a onClick={onClickSupprimer} class="card-link">Supprimer ❌</a>
                </>
                }

            </div>
            </div>

        </>
    )
}
export default Card;