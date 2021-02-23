import "./product.css";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";
import {
  incrementQauntite,
  decrementQauntite,
} from "../../app/Redux-slices/basketsSlice";
import { IconButton } from "@material-ui/core";
import { splitPrix } from "../../utilities";

const Product = ({ image_url, nom, prix, id, quantite }) => {
  const dispatch = useDispatch();

  return (
    <div className='product'>
      <img src={image_url} alt={nom} />
      <div className='product--info'>
        <p className='product--info-title'>{nom}</p>
        <p className='product--info-prix'>{splitPrix(prix)}</p>
      </div>

      <div className='product--quantite'>
        <IconButton
          onClick={() => {
            if (quantite > 0) {
              dispatch(decrementQauntite({ nom }));
            }
          }}>
          <RemoveIcon />
        </IconButton>

        <span>{quantite}</span>

        <IconButton onClick={() => dispatch(incrementQauntite({ nom }))}>
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Product;
