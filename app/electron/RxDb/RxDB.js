const {
  createRxDatabase,
  RxDatabase,
  addRxPlugin,
  addPouchPlugin,
  getRxStoragePouch
  /* ... */
} = require("rxdb"); 
addPouchPlugin(require('pouchdb-adapter-idb')); 

let _getDatabase; // cached
function getDatabase(name = "amusoftech_lq", adapter) {
  if (!_getDatabase) _getDatabase = createDatabase(name, adapter);
  return _getDatabase;
}

async function createDatabase(name, adapter) {
    console.log("Creating Databse");
    addPouchPlugin(require('pouchdb-adapter-idb')); 
  const db = await createRxDatabase({ 
    name,
    adapter:getRxStoragePouch("idb") ,
    password: "amusoftech_lq",
    multiInstance: true,          
    eventReduce: false  
  });
  console.log(" Created Databse");
  

  return db;
}

module.exports = { 
  getDatabase,
};
