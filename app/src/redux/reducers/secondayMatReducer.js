import { TOGGLE_SC_MAT_ITEM } from "../components/sc-material";

const initialState = {
  secondrayMaterial: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  //console.log("payload",payload);
  switch (type) {
    case TOGGLE_SC_MAT_ITEM:
      const { value } = payload;
      return {
        ...state,
        secondrayMaterial: value,
      };

    default:
      return state;
  }
}
