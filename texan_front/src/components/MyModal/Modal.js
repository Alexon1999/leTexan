import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import "./modal.css";
import { IconButton } from "@material-ui/core";
const backdropVaraiants = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
    transition: { duration: 0.3, type: "ease" },
  },
  exit: {
    opacity: 0,
    transition: {
      type: "ease",
      duration: 0.3,
      delay: 0.1,
    },
  },
};

const modalVariant = {
  from: {
    y: -50,
    opacity: 0,
  },
  to: {
    // se deplacer 200px de son emplacement origine
    // y :0 place d'origine
    y: 0, //'200px'
    opacity: 1,
    transition: {
      // type: "spring",
      // stiffness: "100",
      type: "ease",
      delay: 0.1,
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: -50, //'200px'
    transition: {
      type: "ease",
      duration: 0.3,
    },
  },
};

const Modal = ({ showModal, handleClose, closeButton = true, children }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <motion.div
          className='myModal__backdrop'
          varaints={backdropVaraiants}
          exit='exit'
          initial='from'
          animate='to'
          onClick={handleClose}>
          <motion.div className='myModal__modal' variants={modalVariant}>
            {children}

            {closeButton && (
              <div className='myModal__modal__close'>
                <IconButton
                  onClick={handleClose}
                  className='myModal__modal__close-btn'>
                  <i className='fas fa-times'></i>
                </IconButton>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
// compound components = sous composants
Modal.Header = ({ children, ...rest }) => {
  return (
    <div {...rest} className='myModal__header'>
      {children}
    </div>
  );
};
Modal.Body = ({ children, ...rest }) => {
  return (
    <div {...rest} className='myModal__body'>
      {children}
    </div>
  );
};

Modal.Body.Heading = ({ children, ...rest }) => {
  return (
    <h2 {...rest} className='myModal__body__heading'>
      {children}
    </h2>
  );
};

Modal.Body.Content = ({ children, ...rest }) => {
  return (
    <div {...rest} className='myModal__body__content'>
      {children}
    </div>
  );
};

Modal.Footer = ({ children, ...rest }) => {
  return (
    <div {...rest} className='myModal__footer'>
      {children}
    </div>
  );
};

export default Modal;
