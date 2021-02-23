import { useState } from "react";
import burger from "../../images/menu-burger.png";
import ModalBootsrap from "../modal/Modal";
import "./card.css";

import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addProduct } from "../../app/Redux-slices/basketsSlice";
import { addAlert } from "../../app/Redux-slices/alertsSlice";
import { AnimatePresence, motion } from "framer-motion";

import { Button, IconButton } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { splitPrix } from "../../utilities";

import Modal from "../MyModal/Modal";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

const Card = ({
  nom,
  prix,
  id,
  description,
  ingredients,
  produits,
  categories,
  image_url,
}) => {
  const [show, setShow] = useState(false);
  const dispath = useDispatch();
  const [showButton, setShowButton] = useState(false);
  // const baskets = useSelector(selectBaskets)
  const [quantite, setQuantite] = useState(1);

  const handleClose = (e) => {
    // console.log(e.target.classList);

    if (
      e.target.classList.contains("myModal__backdrop") ||
      e.target.classList.contains("myModal__modal__close-btn") ||
      e.target.parentNode.classList.contains("myModal__modal__close-btn") ||
      e.target.parentNode.parentNode.classList.contains(
        "myModal__modal__close-btn"
      )
    ) {
      setShow(false);
      setShowButton(false);
    }
  };

  // const Prix = splitPrix(prix);

  return (
    <div
      className='card__item'
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}>
      <h1 className='card__item__heading'>{nom}</h1>
      <div className='card__item__image-container'>
        <img src={image_url} alt={nom} />
      </div>
      <div className='card__item__details'>
        <p>
          {/* {Prix[0]}€{Prix[1]} */}
          {splitPrix(prix)}
        </p>

        <AnimatePresence>
          {showButton && (
            <motion.div
              variants={ajoutBtn}
              initial='from'
              animate='to'
              exit='exit'
              className='card__item__shopping-btn'
              onClick={() => {
                dispath(
                  addProduct({
                    nom,
                    image_url,
                    prix,
                    id,
                    quantite: 1,
                    categories,
                  })
                );
                dispath(addAlert({ nom, image_url, id: uuidv4() }));
              }}>
              <OverlayTrigger
                placement='top'
                delay={{ show: 250, hide: 300 }}
                trigger={["hover", "focus"]}
                overlay={<Tooltip>Ajouter au panier</Tooltip>}>
                <IconButton
                  color='secondary'
                  style={{ padding: 0 }}
                  aria-label='add to shopping cart'>
                  <AddShoppingCartIcon style={{ fontSize: "25px" }} />
                </IconButton>
              </OverlayTrigger>
            </motion.div>
          )}
        </AnimatePresence>

        <i className='fas fa-eye' onClick={() => setShow(true)}></i>
      </div>

      <Modal showModal={show} setShowModal={setShow} handleClose={handleClose}>
        <Modal.Header>
          <h1>{nom}</h1>
          <img src={image_url} alt={nom} />
          <p>{splitPrix(prix)}</p>
        </Modal.Header>
        <Modal.Body>
          <Modal.Body.Heading>Ingredients utilisés</Modal.Body.Heading>
          <p>Boeuf</p>
          <p>Cheddar</p>
          <p>Salade</p>
        </Modal.Body>
        <Modal.Footer>
          <div
            style={{
              marginRight: "15px",
              display: "flex",
              alignItems: "center",
            }}>
            <IconButton
              style={{ margin: "0 5px" }}
              onClick={() => {
                if (quantite > 0) {
                  setQuantite(quantite - 1);
                }
              }}>
              <RemoveIcon />
            </IconButton>

            <span>{quantite}</span>

            <IconButton
              style={{ margin: "0 5px" }}
              onClick={() => setQuantite(quantite + 1)}>
              <AddIcon />
            </IconButton>
          </div>

          <Button
            disabled={quantite === 0}
            onClick={() => {
              dispath(
                addProduct({ nom, image_url, prix, id, quantite, categories })
              );
              dispath(addAlert({ nom, image_url, id: uuidv4() }));
              setQuantite(1);
            }}
            variant='contained'
            color='secondary'
            className='card__item__commander-btn'
            endIcon={<AddShoppingCartIcon style={{ fontSize: "25px" }} />}>
            Ajouter au panier
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <ModalBootsrap
        nom={nom}
        img={img}
        show={show}
        handleClose={() => {
          setShow(false);
          setShowButton(false);
        }}>
        <h2>Ingredients</h2>
        <p>Boeuf</p>
        <p>Cheddar</p>
        <p>Salade</p>
      </ModalBootsrap> */}
    </div>
  );
};

const ajoutBtn = {
  from: {
    opacity: 0,
    y: 20,
  },
  to: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },

  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
    },
  },
};

export default Card;
