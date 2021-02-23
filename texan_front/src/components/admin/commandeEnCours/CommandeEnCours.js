import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import { useEffect, useState } from "react";
import { calculTotal } from "../../../utilities";

import "./commade-en-cours.css";
import CommandeEnCoursProduct from "./CommandeEnCoursProduct";
const CommandeEnCours = () => {
  const [commandes, setCommandes] = useState([]);

  const fetchCommandes = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/paiement/commande-encours"
    );
    setCommandes(data);
  };

  useEffect(() => {
    fetchCommandes();

    return () => {
      setCommandes([]);
    };
  }, []);

  const commande_est_livre = async (id) => {
    await axios.put("http://localhost:8000/paiement/update-commande", {
      id,
      est_livre: true,
    });

    fetchCommandes();
  };

  return (
    <div className='commande-en-cours'>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "rgb(86 85 85)",
        }}>
        Vos Commandes en cours {commandes.length ? "" : "sont vide"}
      </h1>
      {commandes.map((commande) => (
        <div key={commande.id} className='commande-en-cours__card'>
          <h2 className='commande-en-cours__card-heading'>
            Commande Ref:{" "}
            <span className='commande-en-cours__card-ref'>
              {commande.reference}
            </span>
          </h2>

          {commande.panier.menus.map((menu) => (
            <CommandeEnCoursProduct
              quantite={menu.quantite}
              nom={menu.menu.nom}
              prix={menu.menu.prix}
              key={commande.id.toString() + menu.id.toString()}
            />
          ))}
          {commande.panier.produits.map((produit) => (
            <CommandeEnCoursProduct
              quantite={produit.quantite}
              nom={produit.produit.nom}
              prix={produit.produit.prix}
              key={commande.id.toString() + produit.id.toString()}
            />
          ))}

          <h2 className='commande-en-cours__card-totale'>
            Totale <span>{commande.prix_totale} €</span>
          </h2>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: "black" }} />}
              aria-controls='panel1a-content'
              id='panel1a-header'>
              <h6>Information et Adresse de Livraison</h6>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                {commande.commentaire && (
                  <p className='commande-en-cours__card-commentaire'>
                    Commentaire : {commande.commentaire}
                  </p>
                )}
                <p>Nom: {commande.client.nom + " " + commande.client.prenom}</p>
                <p>Email: {commande.client.email}</p>
                <p>Téléphone: {commande.client.telephone}</p>
                <p>
                  Adresse: {commande.client.adresse}{" "}
                  {commande.client.code_postale} {commande.client.ville}
                </p>
              </div>
            </AccordionDetails>
          </Accordion>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => commande_est_livre(commande.id)}>
              Terminer
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommandeEnCours;
