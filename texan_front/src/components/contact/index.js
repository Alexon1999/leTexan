import React, { useRef } from "react";
import ContactForm from "../form";

import "./contact.css";
import ContactDetails from "./Details";

const Contact = () => {
  const contact_div = useRef(null);

  return (
    <div className='contact' id='contact' ref={contact_div}>
      <div className='contact__container'>
        <ContactDetails />

        <div className='contact__form'>
          <div className='contact__header'>
            <h1 className='contact__heading'>Contactez-nous</h1>
            <p className='contact__text'>
              Veuillez remplir le formulaire ci-dessous et nous vous
              contacterons très prochainement
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
