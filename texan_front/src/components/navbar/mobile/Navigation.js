import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

// import links from "../../../RouteLinks";
import { useNavBarStateValue } from "../../../contexts/Navbar/NavBarState";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = ({
  toggleOpen,
  currentPage,
  IsActiveButton,
  activeButton,
}) => {
  const { state } = useNavBarStateValue();

  return (
    <motion.ul variants={variants}>
      {state.map(({ path, nom, estDansHome, id, active }) => {
        // if (!estDansHome) {
        return (
          <MenuItem
            toggleOpen={toggleOpen}
            key={nom}
            path={path}
            nom={nom}
            currentPage={currentPage}
            estDansHome={estDansHome}
            id={id}
            active={active}
            IsActiveButton={IsActiveButton}
            activeButton={activeButton}
          />
        );
        // }
        // return undefined;
      })}
    </motion.ul>
  );
};
