import React from "react";
import "./hero.css";

import texas from "../../images/texas.png";
import burger from "../../images/burger.png";

import Carousel from "react-bootstrap/Carousel";
import Logo from "../../images/logo.png";

import { Link } from "react-router-dom";

const datas = [
  {
    en_tete: "Découvrez nos burgers gourmets",
    sous_texte:
      "Nos burgers sont préparés à base d’ingrédients frais et de saison, nous proposons des recettes de qualité inspirées de la cuisine Texane.",
    image: burger,
    alt: "burger",
    lien: { route: "/commander", nom: "Commander" },
  },
  {
    en_tete: "Un savoir-faire inspiré du Texas",
    sous_texte:
      "Après un séjour au Texas dans le but de découvrir la culture culinaire et le fameux Barbecue Texan, nous avons acquis un savoir-faire et imaginé des recettes uniques et gourmandes.",
    image: texas,
    alt: "texas",
    lien: { route: "/commander", nom: "Découvrir" },
  },
];

const hero = () => {
  return (
    <>
      <div className='hero' id='hero'>
        <div className='hero__container'>
          <Carousel pause={false}>
            {datas.map((data) => (
              <Carousel.Item interval={5000} className='px-5' key={data.alt}>
                <div className='carousel__item'>
                  <div className='hero__hero'>
                    <div className='hero__hero-hadings'>
                      <img src={Logo} alt='' />
                      <p>{data.en_tete}</p>
                      <p className='hero__subtext'>{data.sous_texte}</p>

                      <Link to={data.lien.route} className='telecharger_btn'>
                        {data.lien.nom}
                      </Link>
                    </div>

                    <div className='hero__hero-image'>
                      <img
                        className='hero__image'
                        src={data.image}
                        alt={data.alt}
                      />
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default hero;
