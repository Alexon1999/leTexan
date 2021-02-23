import { IconButton } from "@material-ui/core";
import { useEffect, useState } from "react";
import carteImg from "../../images/menu.png";

import "./carte.css";

const Carte = ({ setActive, active, activeCarte, setActiveCarte }) => {
  const [carte, setCarte] = useState([
    { libelle: "Menus", nom: "menus" },
    { libelle: "Entrées", nom: "entrees" },
    { libelle: "Burgers", nom: "burgers" },
    { libelle: "Poutines", nom: "poutines" },
    { libelle: "Sides", nom: "sides" },
    { libelle: "Desserts", nom: "desserts" },
    { libelle: "Boissons", nom: "boissons" },
  ]);

  return (
    <div className={"carte " + (activeCarte ? "active" : null)}>
      <div className='carte__image-container'>
        <img src={carteImg} alt='carte_img' />
      </div>

      <div className='carte__items'>
        {carte.map((carte) => (
          <p
            key={carte.nom}
            className={`carte__item ${active === carte.nom ? "active" : ""}`}
            onClick={() => {
              setActive(carte.nom);
              setActiveCarte(false);
            }}>
            {carte.libelle}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Carte;
