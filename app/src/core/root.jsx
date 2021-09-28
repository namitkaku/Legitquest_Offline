import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import Routes from "Core/routes";
import Nav from "./nav";
import "./root.css";
import { PersistGate } from "redux-persist/integration/react";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
//import AlertTemplate from "react-alert-template-basic";
import { AuthProvider } from "../utils/AuthProvider";


const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "10px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
  //containerStyle: { width: 'max-content' } 
  containerStyle: {
    zIndex: 1000
  }

}; 

const AlertTemplate = ({ style, options, message, close }) => (
  <div className={'alert alert-danger'} style={style}> 
    {message}
    <button className="btn btn-link " onClick={close}>   <span className="fa fa-times ml-2 mr-2"></span>  </button>
  </div>
)



class Root extends React.Component {
  render() {
    const { persistor, store, history } = this.props;

    return (
      <React.Fragment>
        <AlertProvider template={AlertTemplate} {...options}>
          <Provider store={store}>
            <AuthProvider>
            <PersistGate loading={null} persistor={persistor}>
              <ConnectedRouter history={history}>
                <Routes></Routes>
              </ConnectedRouter>
            </PersistGate>
            </AuthProvider>
          </Provider>
        </AlertProvider>
      </React.Fragment>
    );
  }
}

export default Root;
