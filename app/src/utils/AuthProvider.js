import React, { useEffect, useState } from "react";
import SessionExpire from "../pages/error/SessionExpire";
import { useAlert } from "react-alert";
import { Redirect } from "react-router";
import OverlayLoading from "../components/OverlayLoading";
import { useDispatch,useSelector } from "react-redux";
import { stopLoading } from "../redux/components/app-state/appStateAction";
import { toggleError } from "../redux/components/errors/errors";

//@ts-ignore
  const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const isLoading = useSelector(state => state.appState.isLoading )
  const errorData = useSelector(state => state.errors.errorData )
  //console.log({errorData});
  const alert = useAlert();
    
  const [currentUser, setCurrentUser] = useState();
   const dispatch = useDispatch()
 
  useEffect(() => {
    //dispatch(stopLoading()) 
    isLoading&&  setTimeout(()=>{
        //isLoading &&  alert.show("Opps,!! Something went Wrong")
       dispatch(stopLoading()) 
    },600000)  // force close loader after 20 seconds 
  }, [isLoading]);

  useEffect(() => {
    errorData.hasError && alert.error(  errorData.errorMessage  )
    if(errorData.hasError ){
    dispatch( toggleError({hasError:false,errorMessage:""}))
    }
   
  }, [errorData.hasError])
  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}>
      {isLoading && <OverlayLoading />}
      {children}
    </AuthContext.Provider>
  );
};
export   {AuthProvider,AuthContext}