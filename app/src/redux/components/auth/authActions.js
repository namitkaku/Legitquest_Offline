export const  SET_AUTH ="SET_AUTH"

export const setAuth = (userData) => ({
  type: SET_AUTH,
  payload: userData,
});
