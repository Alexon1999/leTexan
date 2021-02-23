import { createSlice } from "@reduxjs/toolkit";

// *  Writing the Slices

//+ createSlice returns a "slice" object that contains the generated reducer function as a field named reducer,
//+ and the generated action creators inside an object called actions.
export const basketsSlice = createSlice({
  name: "baskets",
  initialState: [],
  reducers: {
    incrementQauntite: (state, action) => {
      const productIdx = state.findIndex(
        (product) => product.nom === action.payload.nom
      );
      if (productIdx !== -1) {
        state[productIdx].quantite++;
      }
    },
    decrementQauntite: (state, action) => {
      const productIdx = state.findIndex(
        (product) => product.nom === action.payload.nom
      );

      if (productIdx !== -1) {
        if (state[productIdx].quantite === 1) {
          state.splice(productIdx, 1);
        } else {
          state[productIdx].quantite--;
        }
      }
    },

    addProduct: (state, action) => {
      const productIdx = state.findIndex(
        (product) => product.nom === action.payload.nom
      );
      if (productIdx !== -1) {
        // const quantite = state[productIdx].quantite + action.payload.quantite;
        // state.splice(productIdx, 1, {
        //   ...action.payload,
        //   quantite,
        // });
        const product = state[productIdx];
        product.quantite += action.payload.quantite;
      } else {
        state.push(action.payload);
      }
    },

    emptyBasket: (state) => {
      state.length = 0;
    },
  },
});

//+ generated action creator functions :return an object with payload and type
export const {
  incrementQauntite,
  decrementQauntite,
  incrementByAmount,
  addProduct,
  emptyBasket,
} = basketsSlice.actions;

// useSelector(state => state.baskets) :returns the state for baskets
export const selectBaskets = (state) => state.baskets;

// + the generated reducer function
export default basketsSlice.reducer;
