import React from "react";

import "./contactdetails.css";

import Card from "../card/Card";

import MapIcon from "@material-ui/icons/Map";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIcon from "@material-ui/icons/Phone";

const datas = [
  {
    id: 1,
    nom: "Adresse",
    content: [
      "CEOS TECH",
      "7 place de l'Hôtel de Ville",
      "93600 Aulnay sous Bois",
      "France",
    ],
    icone: MapIcon,
  },

  {
    id: 2,
    nom: "Téléphone",
    content: ["(+33) 635364499"],
    icone: PhoneIcon,
  },

  {
    id: 3,
    nom: "Email",
    content: ["contact@markus-app.com"],
    icone: MailOutlineIcon,
  },
  {
    id: 4,
    content: [
      <a
        href='https://www.facebook.com/Markusapp-100288068734888'
        rel='noreferrer'
        target='_blank'>
        <i className='fab fa-facebook contact__icones'></i>
      </a>,
      <a
        href='https://www.instagram.com/markus.application/'
        rel='noreferrer'
        target='_blank'>
        <i className='fab fa-instagram contact__icones'></i>
      </a>,
      <a href='https://twitter.com/app_Markus' rel='noreferrer' target='_blank'>
        <i className='fab fa-twitter contact__icones'></i>
      </a>,
      <a
        href='https://www.linkedin.com/company/markus-app/'
        rel='noreferrer'
        target='_blank'>
        <i className='fab fa-linkedin-in contact__icones'></i>
      </a>,
    ],
  },
];

const ContactDetails = () => {
  return (
    <div className='contact-details'>
      {datas.map((data) => (
        <Card {...data} key={data.id} />
      ))}
    </div>
  );
};

export default ContactDetails;
