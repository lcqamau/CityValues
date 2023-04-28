import React from 'react';
import Field from "../components/forms/Field";

const HomePage = () => {
    return ( 
      <>
      <h1 className='text-center'>Bienvenue sur ACME</h1>
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="https://cdn.pixabay.com/photo/2014/04/02/10/43/sneakers-304334_960_720.png" class="d-block w-100" alt="..."/>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Que faisons nous? </h5>
              <p class="card-text">Nous sommes un site e-commerce qui vend des chaussures de sport pour hommes et femmes.  </p>
              <p class="card-text"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Qui sommes nous? </h5>
              <p class="card-text">ACME est une entrprise qui produit des chaussures de sport pour les hommes et les femmes.</p>
              <p class="card-text"></p>
            </div>
          </div>
          <div class="col-md-4">
            <img src="https://i.f1g.fr/media/eidos/805x453_crop/2017/05/02/XVM71e72422-2f16-11e7-afe3-0772d0153cc5.jpg" class="d-block w-100" alt="..."/>
          </div>
        </div>
        </div>
        <br/>
        <footer >
            <h4 >Contactez nous pour plus d'information:</h4>
            <br/>
            <form method="POST">
                <Field type="text" value="" name= "nom" placeholder="Name"/> 
                <Field type="text" value="" name= "email" placeholder="Your email"/>
                <button type="submit">Validé</button>
                <br/>
            </form>
            <a href="https://facebook.com"><img width="30px" src="https://www.meilleure-innovation.com/wp-content/uploads/2021/11/1200px-facebook-logo-2019-1024x1024.png" alt="facebook"/></a>
            <a href= "https://youtube.com"><img width="30px" src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" alt="facebook"/></a>
            <a href= "https://instagram.com"><img width="30px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" alt="facebook"/></a>
            <a href= "https://www.linkedin.com"><img width="30px" src="https://img1.freepng.fr/20180320/aqe/kisspng-linkedin-logo-computer-icons-business-symbol-linkedin-icon-5ab1765616c913.9690645915215796060933.jpg" alt="facebook"/></a>
      </footer>

      </>
    )}
export default HomePage;