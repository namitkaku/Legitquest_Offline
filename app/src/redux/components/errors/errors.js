export const  TOGGLE_ERROR ="TOGGLE_ERROR"

/* const erroData={
 hasError:Boolean,
 errorMessage:String
} */
export const toggleError = (erroData) => ({
  type: TOGGLE_ERROR,
  payload: erroData,
});
