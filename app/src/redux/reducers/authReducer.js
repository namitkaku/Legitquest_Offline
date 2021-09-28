import { SET_AUTH } from "../components/auth/authActions";

const initialState = {
  userData: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        userData: action.payload,
      };

    default:
      return state;
  }
}
