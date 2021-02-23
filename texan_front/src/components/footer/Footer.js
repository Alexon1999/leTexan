import React from "react";

import "./footer.css";
import logo from "../../images/logo.png";
import googlePlay from "../../images/google-play.svg";
import appleStore from "../../images/app-store.svg";
// import { useDimensions } from "../../hooks/useDimensions";
import useWindowMatchMedia from "../../hooks/useWindowMatchMedia";
import FooterMobile from "./FooterMobile";
import { Link, useHistory } from "react-router-dom";
import { smoothScroll } from "../../utilities";

const contacts = {
  tel: "0635364499",
  addr: "7 place de l'Hôtel de Ville 93600 Aulnay sous Bois, France",
  email: "contact@markus-app.com",
};

const Footer = () => {
  const history = useHistory();
  // const footer_container_ref = useRef(null);
  // const { height, width } = useDimensions(footer_container_ref);
  const { isInTheMediaQuery } = useWindowMatchMedia(600);

  const pushToCGU = (id) => (e) => {
    history.push("/cgu");
    smoothScroll(id)(e);
  };

  return (
    <div className='footer'>
      {!isInTheMediaQuery ? (
        <div
          className='footer__container'
          // ref={footer_container_ref}
        >
          <div className='footer__a-propos-de-nous'>
            <div className='footer__a-propos-de-nous__image-container'>
              <img src={logo} alt='logo markus' />
            </div>

            <div className='footer__a-propos-de-nous__content'>
              <div className='footer__a-propos-de-nous__content__headings'>
                <p>Le bras de droit des restaurateurs</p>
              </div>
            </div>
          </div>

          <div className='footer__telechargement'>
            <h1>Télécharger gratuitement l'application sur</h1>
            <a href='#test'>
              <img src={googlePlay} alt='google play store' /> Google play Store
            </a>
            <a href='#test'>
              <img src={appleStore} alt='Apple store' /> Apple store
            </a>
          </div>

          <div className='footer__contacts'>
            <h1>Prendre contact avec nous</h1>
            <div className='footer__contacts-content'>
              <p>
                <i className='fas fa-phone-alt'></i> {contacts.tel}
              </p>
              <a href={"mailto:" + contacts.email}>
                <i className='fas fa-envelope'></i> {contacts.email}
              </a>
              <p>
                <i className='fas fa-map-marker-alt'></i> {contacts.addr}
              </p>
            </div>
            <div className='footer__suivez-nous'>
              <a
                href='https://www.facebook.com/Markusapp-100288068734888'
                rel='noreferrer'
                target='_blank'>
                <i className='fab fa-facebook'></i>
              </a>
              <a
                href='https://www.instagram.com/markus.application/'
                rel='noreferrer'
                target='_blank'>
                <i className='fab fa-instagram'></i>
              </a>
              <a
                href='https://twitter.com/app_Markus'
                rel='noreferrer'
                target='_blank'>
                <i className='fab fa-twitter'></i>
              </a>
              <a
                href='https://www.linkedin.com/company/markus-app/'
                rel='noreferrer'
                target='_blank'>
                <i className='fab fa-linkedin-in'></i>
              </a>
            </div>
          </div>

          <div className='footer__legales'>
            <h1>Conformité</h1>
            {/* <a href='CGU site web Markus.pdf' target='_blank'>
              CGU &amp; Mention légales
            </a> */}
            {/* <Link to='/cgu'>CGU &amp; Mention légales</Link> */}
            <a href='#politique' onClick={pushToCGU("politique")}>
              CGU &amp; Mention légales
            </a>
          </div>
        </div>
      ) : (
        <FooterMobile contacts={contacts} pushToCGU={pushToCGU} />
      )}
    </div>
  );
};

export default Footer;
