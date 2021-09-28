const { Client } = require("@elastic/elasticsearch");  
const { getClientUrl } = require("./getClientUrl");  
function getClient(params) {  
  const client = new Client({ node: getClientUrl() });   
  return client
}

module.exports = {getClient};
