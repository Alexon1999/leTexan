import React, { useRef, useEffect, useState } from "react";
// import ReactDOM from 'react-dom';

import "./navmobile.css";

import { motion, useCycle } from "framer-motion";
import { useDimensions } from "../../../hooks/useDimensions";
import MenuToggle from "./MenuToggle";
import { Navigation } from "./Navigation";

const sidebar = {
  open: (height = 1000) => ({
    // +  clip path:       taille            ||  x  || y
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    // + clip path: taille || x pos || y pos
    clipPath: "circle(50px at 300px -50px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const NavMobile = ({ currentPage, IsActiveButton, activeButton }) => {
  const [isOpen, setOpen] = useState(false);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const toggleOpen = () => setOpen((prev) => !prev);

  useEffect(() => {
    if (isOpen) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <motion.nav
      className='nav-mobile'
      initial={false}
      animate={isOpen ? "open" : "closed"}
      style={{
        pointerEvents: isOpen ? "all" : "none",
      }}
      custom={height}
      ref={containerRef}>
      <motion.div className='background' variants={sidebar} />
      <Navigation
        toggleOpen={toggleOpen}
        currentPage={currentPage}
        IsActiveButton={IsActiveButton}
        activeButton={activeButton}
      />
      <MenuToggle
        isOpen={isOpen}
        toggle={() => {
          toggleOpen();
        }}
      />
    </motion.nav>
  );
};

export default NavMobile;
