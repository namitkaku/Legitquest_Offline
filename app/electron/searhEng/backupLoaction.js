//import { getClient } from './getClient';
const { getClientUrl } = require("./getClientUrl");
async function setLocation(req, res) {
  const URL = `${getClientUrl()}/_snapshot/amusoftech_lq_offline`;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    type: "fs",
    settings: {
      location: "/Users/amusoftech/Documents/esbackup",
    },
    verify: false,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

 const  respounce = await fetch(URL, requestOptions)
    .then((response) => response.json()) 

  res.setHeader("Content-Type", "application/json");
  res.send({respounce });
}

module.exports = { setLocation };
