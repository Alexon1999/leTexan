import "./panier.css";
import { useSelector } from "react-redux";
import { selectBaskets } from "../app/Redux-slices/basketsSlice";
import Empty from "../images/empty.svg";
import Product from "../components/product/Product";
import { calculTotal, getNombresArticles } from "../utilities";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

const Panier = () => {
  const history = useHistory();
  const baskets = useSelector(selectBaskets);

  return (
    <div className='panier'>
      {!baskets.length ? (
        <div className='panier__vide'>
          <h1>Votre panier est vide</h1>
          <img src={Empty} alt='empty basket' />
        </div>
      ) : (
        <div className='panier__container'>
          <h1>
            Détail de votre panier ( {getNombresArticles(baskets)} article
            {getNombresArticles(baskets) > 1 && "s"})
          </h1>
          {baskets.map((product) => {
            return <Product key={product.nom} {...product} />;
          })}

          <div className='panier__container--prix'>
            <h1>TOTAL</h1>
            <p>{calculTotal(baskets)} €</p>
          </div>

          <Button
            onClick={() => history.push("/paiement")}
            type='submit'
            variant='contained'
            color='primary'
            className='panier__container--btn-valider'>
            Valider Mon Panier
          </Button>
        </div>
      )}
    </div>
  );
};

export default Panier;
