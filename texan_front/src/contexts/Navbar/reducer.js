import * as action_types from "./actiontypes";

const reducer = (state, action) => {
  switch (action.type) {
    case action_types.SET_ACTIVE:
      return state.map((link) =>
        link.id === action.id
          ? { ...link, active: true }
          : { ...link, active: false }
      );
    case action_types.SET_DEACTIVE:
      return state.map((link) =>
        link.id === action.id ? { ...link, active: false } : link
      );
    default:
      return state;
  }
};

export default reducer;
