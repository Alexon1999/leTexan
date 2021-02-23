import React, { useContext, useReducer, createContext } from "react";
import reducer from "./reducer";
export const NavBarContext = createContext();

const initialState = [
  { path: "/", id: "home", nom: "Le Texan", estDansHome: true, active: true },

  { path: "/commander", nom: "Commander", estDansHome: false, active: false },
  {
    path: "/contact",
    nom: "Nous contacter",
    estDansHome: false,
    active: false,
  },
  {
    path: "/panier",
    nom: "Mon panier",
    estDansHome: false,
    active: false,
    isBasket: true,
  },
];

const NavBarContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NavBarContext.Provider value={{ state, dispatch }}>
      {children}
    </NavBarContext.Provider>
  );
};

export const useNavBarStateValue = () => useContext(NavBarContext);

export default NavBarContextProvider;
