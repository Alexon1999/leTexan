import React, { useEffect } from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import "./adminPage.css";

import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectAdmin, changePage } from "../../app/Redux-slices/adminSlice";
import AdminNav from "./menu/Menu";
import NouvelleCommande from "./nouvelleCommande/NouvelleCommande";
import Suivi from "./suivi/Suivi";
import Disponibilte from "./disponibilite/Disponibilite";
import HistoriqueCommande from "./historiqueCommande/HistoriqueCommande";
import CommandeEnCours from "./commandeEnCours/CommandeEnCours";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: 0,
    right: 10,
  },
});

const AdminPage = () => {
  const admin = useSelector(selectAdmin);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const { path, url } = useRouteMatch();
  console.log(path, url); //  /admin

  useEffect(() => {
    dispatch(changePage(admin.currentPage));
    history.push(path + "/nouvelles-commandes");
  }, []);

  return (
    <div className='adminPage'>
      <IconButton className={classes.root}>
        <ExitToAppIcon style={{ fontSize: 40 }} />
      </IconButton>

      <div className='adminPage__container'>
        <AdminNav />
        <div style={{ flex: 1, padding: "1rem", width: "100%" }}>
          {/* TODO:  */}
          <Switch>
            <Route exact path={path + "/nouvelles-commandes"}>
              <NouvelleCommande />
            </Route>
            <Route exact path={path + "/commande-en-cours"}>
              <CommandeEnCours />
            </Route>
            <Route exact path={path + "/historiques"}>
              <HistoriqueCommande />
            </Route>
            <Route exact path={path + "/suivi-activites"}>
              <Suivi />
            </Route>
            <Route exact path={path + "/disponibles-plats"}>
              <Disponibilte />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
