import { useState } from "react";

import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  makeStyles,
  // Modal,
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import useForm from "../hooks/useForm";

import "./paiement.css";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { selectBaskets, emptyBasket } from "../app/Redux-slices/basketsSlice";
import spinner from "../images/spinner.gif";
import { calculPrixProduitAvecQuantite, calculTotal } from "../utilities";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Modal from "../components/MyModal/Modal";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  margin: {
    margin: theme.spacing(1, 0),
  },
  marginLeftRight: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },

  buttonIcon: {
    paddingLeft: 1,
  },

  border: {
    "& label.Mui-focused": {
      color: "#ccc",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#ccc",
    },

    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#ccc",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ccc",
      },
    },
  },
}));

const initial = {
  nom: "",
  prenom: "",
  email: "",
  num_tel: "",
  adresse: "",
  ville: "",
  code_postale: "",
};

const Paiement = () => {
  const [paiment_process, setPaiement_process] = useState("livraison");
  const [showModal, setShowModal] = useState(false);

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const history = useHistory();

  const dispatch = useDispatch();
  const baskets = useSelector(selectBaskets);

  const classes = useStyles();

  const estValide = (fieldValues = state) => {
    const validator = {};
    if ("nom" in fieldValues)
      validator.nom = state.nom ? null : "le champ nom est obligatore";
    if ("prenom" in fieldValues)
      validator.prenom = state.prenom ? null : "le champ prenom est obligatore";

    if ("email" in fieldValues)
      validator.email = /([a-zA-Z0-9-_.+]{4,})@.+\..+/.test(email)
        ? null
        : "Email n'est pas valide";

    if ("num_tel" in fieldValues)
      validator.num_tel = /(?:(\+(\d{1,2})?)[ -]?)?\(?(?<first>\d{3})\)?[-\s]?(\d{3})[- ]?(\d{4})/.test(
        num_tel
      )
        ? null
        : "Numéro de téléphone n'est pas valide";

    if ("adresse" in fieldValues)
      validator.adresse = state.adresse
        ? null
        : "le champ adresse est obligatore";
    if ("ville" in fieldValues)
      validator.ville = state.ville ? null : "le champ ville est obligatore";

    if ("code_postale" in fieldValues)
      validator.code_postale = /\d+/.test(code_postale)
        ? null
        : "Code postale n'est pas valide";

    setErrors({ ...validator });

    // retourne boolean si et seulement si on passe un parametre pour la fonction
    if (fieldValues === state) {
      return Object.values(validator).every((el) => !el);
    }
  };

  const {
    state,
    handleInputChange,
    errors,
    setErrors,
    reinitialiserState,
  } = useForm(initial, estValide);

  const { nom, prenom, email, num_tel, adresse, ville, code_postale } = state;

  const prixTotale = calculTotal(baskets);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (estValide()) {
      setPaiement_process("paiement");
    }
  };

  const handleChange = (event) => {
    // Listen for changes in CardElement
    // and display any errors as the customer types their card details
    // console.log(event);
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const Payer = async (e) => {
    e.preventDefault();

    setProcessing(true);

    const { data } = await axios.post(
      // "https://texan-stripe.herokuapp.com/create-client-secret",
      "http://localhost:8000/paiement/create-client-secret",
      {
        amount: parseInt((prixTotale * 100).toFixed(2), 10),
        email,
      }
    );
    // *100 : stripe prend l'unité en centimes
    // 3€ -> 300 centimes

    const billing_details = {
      name: nom + " " + prenom,
      address: {
        city: ville,
        country: "fr",
        state: null,
        line1: adresse,
        line2: null,
        postal_code: code_postale,
      },
      email,
      phone: num_tel,
    };

    try {
      const payload = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details,
        },
      });
      if (payload.error) {
        setError(`Paiement échoué: ${payload.error.message}`);
        setProcessing(false);
      } else {
        setError(null);
        setProcessing(false);
        setDisabled(false);
        setSucceeded(true);

        const menus = [];
        const produits = [];
        baskets.forEach((item) => {
          if (item.categories.some((categ) => categ.nom === "menus")) {
            menus.push({ menu_id: item.id, quantite: item.quantite });
          } else {
            produits.push({
              produit_id: item.id,
              quantite: item.quantite,
            });
          }
        });

        console.log({ menus, produits });
        // const menus = baskets
        //   .filter((item) =>
        //     item.categories.some((categ) => categ.nom === "menus")
        //   )
        //   .map((menu) => ({ menu_id: menu.id, quantite: menu.quantite }));

        // const produits = baskets
        //   .filter((item) =>
        //     item.categories.every((categ) => categ.nom !== "menus")
        //   )
        //   .map((produit) => ({
        //     produit_id: produit.id,
        //     quantite: produit.quantite,
        //   }));

        const data = {
          client: {
            nom,
            prenom,
            email,
            telephone: num_tel,
            adresse,
            ville,
            code_postale,
          },
          panier: {
            menus,
            produits,
          },
          commentaire: "",
          prix_totale: prixTotale,
        };

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        try {
          const commande = await axios.post(
            "http://localhost:8000/paiement/create-commande",
            data,
            config
          );
          // console.log(commande.data);
        } catch (error) {
          // console.log(error);
        }

        reinitialiserState();
        dispatch(emptyBasket());
        history.replace("/felicitation", { payer: true });
      }
    } catch (err) {
      // console.log(err.message);
      // setError(err.message);
      // console.log(err);
    }
  };

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
      setShowModal(false);
    }
  };

  const handleOpen = () => {
    setShowModal(true);
  };

  return (
    <div className='paiment'>
      <div className='paiement__container'>
        <h1>Caisse</h1>
        <div className='paiement__process'>
          <div
            className={
              "paiement__process--option1 paiement__process--options active"
            }>
            <span>1</span>
            <p>Adresse de livraison</p>
          </div>
          <hr />
          <div
            className={
              "paiement__process--option2 paiement__process--options " +
              (paiment_process === "paiement" ? "active" : "")
            }>
            <span>2</span>
            <p>Détails de paiement</p>
          </div>
        </div>

        {paiment_process === "livraison" ? (
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}>
              <InputLabel>Nom</InputLabel>
              <Input
                value={nom}
                name='nom'
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <div className='error'>{errors.nom}</div>
            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}>
              <InputLabel>Prenom</InputLabel>
              <Input
                value={prenom}
                name='prenom'
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <div className='error'>{errors.prenom}</div>

            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}>
              <InputLabel>Adresse Mail</InputLabel>
              <Input
                type='email'
                name='email'
                onChange={handleInputChange}
                value={email}
                required
              />
            </FormControl>
            <div className='error'>{errors.email}</div>

            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}>
              <InputLabel>Numéro de Téléphone</InputLabel>
              <Input
                value={num_tel}
                name='num_tel'
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <div className='error'>{errors.num_tel}</div>

            <FormControl
              fullWidth
              className={`${classes.margin} ${classes.border} `}>
              <InputLabel>Adresse</InputLabel>
              <Input
                value={adresse}
                name='adresse'
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <div className='error'>{errors.adresse}</div>

            <div style={{ display: "flex" }}>
              <FormControl
                fullWidth
                className={`${classes.margin} ${classes.border} ${classes.marginLeftRight}`}>
                <InputLabel>Ville</InputLabel>
                <Input
                  value={ville}
                  name='ville'
                  onChange={handleInputChange}
                  required
                />
                <div className='error'>{errors.ville}</div>
              </FormControl>
              <FormControl
                fullWidth
                className={`${classes.margin} ${classes.border} ${classes.marginLeftRight}`}>
                <InputLabel>Code Postale</InputLabel>
                <Input
                  value={code_postale}
                  name='code_postale'
                  onChange={handleInputChange}
                  required
                />
                <div className='error'>{errors.code_postale}</div>
              </FormControl>
            </div>

            <Button
              type='submit'
              variant='contained'
              color='primary'
              className='paiement--btn'
              endIcon={<NavigateNextIcon />}>
              Suivant
            </Button>
          </form>
        ) : (
          <div className='paiement__details'>
            <div className='paiement__details__recapitualitfs'>
              <h2>Récapitualatif de commande</h2>
              {baskets.map((product) => (
                <div
                  className='paiement__details__product__details'
                  key={product.nom}>
                  <div className='paiement__details__product__details-info'>
                    <p>{product.nom}</p>
                    <p className='paiement__details__product__details-info-quantite'>
                      Quantité: <span> {product.quantite} </span>{" "}
                    </p>
                  </div>
                  <div className='paiement__details__product__details-prix'>
                    <p>{calculPrixProduitAvecQuantite(product)}€</p>
                  </div>
                </div>
              ))}
              <div className='paiement__details__recapitualitfs-total'>
                <p>TOTAL</p>
                <p className='paiement__details__recapitualitfs-total-prix'>
                  {prixTotale}€
                </p>
              </div>
            </div>

            <div className='paiement__details__modePaiement'>
              <h2>Mode de paiement</h2>
              <form className='paiement__form'>
                <CardElement
                  id='card-element'
                  onChange={handleChange}
                  options={cardStyle}
                />
                {error && (
                  <div className='paiement__details__error'>* {error}</div>
                )}

                {baskets.length === 0 && (
                  <div className='paiement__details__error'>
                    * Vous n'avez rien dans le panier
                  </div>
                )}

                <Button
                  onClick={Payer}
                  disabled={
                    prixTotale <= 1 || processing || disabled || succeeded
                  }
                  type='submit'
                  variant='contained'
                  color='primary'
                  className='paiement--btn-payer'>
                  <span className='paiement--btn-payer-text'>
                    {processing ? (
                      <img src={spinner} alt='spinner' />
                    ) : (
                      <>Payer {prixTotale}€</>
                    )}
                  </span>
                </Button>
              </form>
              <p className='paiement__details__securise'>
                <i className='fas fa-lock'></i> Paiement 100% sécurisé
              </p>
            </div>
          </div>
        )}

        <div className='paiement__close'>
          <IconButton onClick={handleOpen}>
            <i className='fas fa-times'></i>
          </IconButton>
        </div>
        <div
          className={
            "paiement__back " + (paiment_process === "paiement" ? "active" : "")
          }>
          <IconButton onClick={() => setPaiement_process("livraison")}>
            <i className='fas fa-arrow-left'></i>
          </IconButton>
        </div>

        <Modal
          closeButton={false}
          showModal={showModal}
          setShowModal={setShowModal}
          handleClose={handleClose}>
          <Modal.Header>
            <h2>
              Etes vous sûr de vouloir quitter cette page et retourner à l'écran
              de commande ?
            </h2>
          </Modal.Header>
          <Modal.Footer>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleClose}
              className='myModal__modal__close-btn'>
              Annuler
            </Button>
            <Button
              variant='contained'
              style={{ marginLeft: "20px" }}
              className='myModal__modal__close-btn'
              onClick={(e) => {
                handleClose(e);
                history.replace("/commander");
              }}>
              Oui
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aaa",
        backgroundColor: "#fff",
      },
      ":-webkit-autofill": {
        color: "#fff",
      },
      ":focus": {
        color: "#aaa",
      },
    },

    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};

export default Paiement;
