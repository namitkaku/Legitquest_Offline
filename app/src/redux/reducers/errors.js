import { TOGGLE_ERROR } from "../components/errors/errors";

const initialState = {
  errorData: {
    hasError: false,
    errorMessage: ""
  }
};
export default function(state = initialState, action) { 
  switch (action.type) {
    case TOGGLE_ERROR:
      return {
        ...state,
        errorData: action.payload
      };

    default:
      return state;
  }
}
