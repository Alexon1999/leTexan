import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import { useEffect, useState } from "react";
import Product from "./Product";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "3rem auto",
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightMedium,
    color: "rgb(94, 92, 243)",
  },

  color: {
    color: "black",
  },
}));

const NouvelleCommande = () => {
  const classes = useStyles();
  const [commandes, setCommandes] = useState([]);

  const fetchCommandes = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/paiement/nouvelle-commande"
    );
    setCommandes(data);
  };

  useEffect(() => {
    fetchCommandes();

    return () => {
      setCommandes([]);
    };
  }, []);

  const commande_est_vue = async (id) => {
    await axios.put("http://localhost:8000/paiement/update-commande", {
      id,
      est_vue: true,
    });

    fetchCommandes();
  };

  return (
    <div className={"nouvelleCommande " + classes.root}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "rgb(86 85 85)",
        }}>
        {commandes.length
          ? "Vos Nouvelles Commandes"
          : "Pas de Nouvelles commandes"}
      </h1>
      {commandes.map((commande) => (
        <Accordion className={classes.color} key={commande.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "black" }} />}
            aria-controls='panel1a-content'
            id='panel1a-header'>
            <Typography className={classes.heading}>
              Commande Ref: {commande.reference}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}>
              <Product commande={commande} />
              <Button
                variant='contained'
                color='primary'
                onClick={() => commande_est_vue(commande.id)}>
                OK
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default NouvelleCommande;
