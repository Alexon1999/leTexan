import React from "react";

import "./product.css";

const Product = ({ commande }) => {
  return (
    <div className='nouvelle__commande__product'>
      {commande.panier.menus.map((menu) => (
        <div key={commande.id.toString() + menu.id.toString()}>
          <h1>{menu.menu.nom}:</h1>
          <h1 className='nouvelle__commande__product-quantite'>
            {menu.quantite}
          </h1>
        </div>
      ))}
      {commande.panier.produits.map((produit) => (
        <div key={commande.id.toString() + produit.id.toString()}>
          <h1>{produit.produit.nom}</h1>
          <h1 className='nouvelle__commande__product-quantite'>
            {produit.quantite}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Product;
