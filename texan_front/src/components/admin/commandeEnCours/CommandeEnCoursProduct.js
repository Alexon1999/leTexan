import { useState } from "react";
import { splitPrix } from "../../../utilities";
const CommandeEnCoursProduct = ({ nom, prix, quantite }) => {
  // const [finish, setFinish] = useState(false);
  const prix_quantite = (prix * quantite).toFixed(2);

  return (
    <div
      className={
        "commande-en-cours__card-product "
        // + (finish ? "finish" : "")
      }>
      <div className='commande-en-cours__card-product__info'>
        <h2>{quantite}</h2>
        <h2 className='commande-en-cours__card-product-title'>{nom}</h2>
        <h2>{splitPrix(prix_quantite)}</h2>
      </div>
      {/* <div className='commande-en-cours__card-product-icones'>
        <i
          className='fas fa-check commande-en-cours__card-product-icone'
          onClick={() => setFinish(true)}></i>
        <i
          className='fas fa-times commande-en-cours__card-product-icone'
          onClick={() => setFinish(false)}></i>
      </div> */}
    </div>
  );
};

export default CommandeEnCoursProduct;
