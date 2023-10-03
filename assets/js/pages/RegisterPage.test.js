import React from 'react';
import { render, fireEvent, waitFor } from 'react';
import Chaussures from './Chaussures';

// Mock de la fonction de récupération des produits
jest.mock('../services/produitsAPI', () => ({
  findAll: jest.fn(() => Promise.resolve([
    {id: 1, nom_produit: 'Chaussure 1', prix: 50, stock: 10, photo: 'photo1.jpg'},
    {id: 2, nom_produit: 'Chaussure 2', prix: 70, stock: 5, photo: 'photo2.jpg'}
  ]))
}));

// Mock de la fonction de récupération de l'utilisateur
jest.mock('../services/usersAPI', () => ({
  findAll: jest.fn(() => Promise.resolve([
    {id: 1, email: 'test@test.com'},
    {id: 2, email: 'test2@test.com'}
  ]))
}));

// Mock de la fonction de post pour le panier
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve())
}));

describe('Chaussures component', () => {
  it('should render the component', async () => {
    const { getByText } = render(<Chaussures />);
    expect(getByText('Nom du produit')).toBeInTheDocument();
    expect(getByText('Prix : 50 €')).toBeInTheDocument();
    expect(getByText('Prix : 70 €')).toBeInTheDocument();
  });

  it('should add a product to the cart when clicking on the "Ajouter au panier" button', async () => {
    const { getByText, getByLabelText } = render(<Chaussures />);
    const tailleSelect = getByLabelText('Taille');
    const addToCartButton = getByText('Ajouter au panier');
    fireEvent.change(tailleSelect, { target: { value: '36' } });
    fireEvent.click(addToCartButton);
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/paniers', {
        Produits:'/api/produits/1',
        user:'/api/users/1',
        Taille: '36'
      });
    });
  });
});