const API_URL = "https://www.legitquest.com/api/v1.0/getcorporateUserapi"; 
//parametser: corporate_id , username,password,mac_id

async function AuthUser(corporate_id,email, password, mac) {
  /*   const result = await fetch(API_URL);
  let respounce = await result.json();
  return { email, password, mac, respounce }; */

  var formdata = new FormData();
  formdata.append("corporate_id", corporate_id);
  formdata.append("username", email);
  formdata.append("password", password);
  formdata.append("mac_id", mac);

  var requestOptions = {
    method: "POST",
    body: formdata,
    ///redirect: "follow",
  };

  const result = await fetch(API_URL, requestOptions)
  let respounce = await result.json(); 
    /* .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error)); */
    return respounce
}

module.exports = AuthUser;
