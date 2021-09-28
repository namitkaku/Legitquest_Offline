import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import undoable from "easy-redux-undo";
import homeReducer from "../components/home/homeSlice";
import counterReducer from "../components/counter/counterSlice";
import complexReducer from "../components/complex/complexSlice";
import searchReducer from "./searchReducer";
import secondayMatReducer from "./secondayMatReducer";
import filterReducer from "./filterReducer";
import appSateReducer from "./appSateReducer";
import authReducer from "./authReducer"; 
import errors from "./errors"; 

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    search:searchReducer,
    appState:appSateReducer,
    home: homeReducer,
    auth:authReducer,
    secMat: secondayMatReducer ,    
    filter:filterReducer,
    errors,
    undoable: undoable(
      combineReducers({
        counter: counterReducer,
        complex: complexReducer
      })
    )
  });

export default rootReducer;
