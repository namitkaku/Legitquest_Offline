import PouchDB from "pouchdb-core";
import idb from "pouchdb-adapter-idb";
import PouchdbFind from "pouchdb-adapter-idb";
PouchDB.plugin(require("pouchdb-find").default);
PouchDB.plugin(require("pouchdb-quick-search"));
PouchDB.plugin(require("pouchdb-load"));

//http://localhost/offlinedb/autocomplete.json
/* 
PouchDB["plugin"](idb);
export default class DBUtill {
  constructor() {
    PouchDB.plugin(require("pouchdb-find").default);
    PouchDB.plugin(require("pouchdb-quick-search"));
    
    if (!this.db) new PouchDB("foo", { adapter: "idb" });
  }

  get dataBase() {
    this.db;
  }
}

  */
/**
 *
 * @param {*} QUERY
 * @returns {[]}
 * @description it workes with json data, and pouch database
 */
export const searchForTypeHead = async (QUERY) => {
    console.log({QUERY});
  const db = getDataBase();
  const results = await db.search({
    query: QUERY,
    fields: ["name", "type"],
    include_docs: true,
  });
  console.log({results});
  const items = results?.rows?.map((item) => {
    const { doc } = item;
    return { Key: doc.name, Value: doc.name };
  });
  console.log({items});
  return items;
};
export const getDataBase = () => {
  return new PouchDB("foo", { adapter: "idb" });
};

export const loadDataFromFile = async () => {
  const db = getDataBase();
  let response = await fetch("http://localhost/offlinedb/autocomplete.json");
  response = await response?.json();

  /* db.load( response )
    .then(function () {
      console.log("loading done");
    })
    .catch(function (err) {
      console.log("Error while loading done",err);
    });
    console.log({response}); */
  let bulkDoc = await response.map((item) => {
    const {
      _index,
      _id,
      _source: { name, type },
    } = item;
    return { index: _index, name, type };
  });

  try {
    var result = await db.bulkDocs(bulkDoc);
  } catch (err) {
    console.log(err);
  }
  console.log({ result });

  /* db.bulkDocs(bulkDoc).then(function (result) {
        console.log(result); 
      }).catch(function (err) {
        console.log(err);
      }); */

  //db.
};

export const allDocCount = () => {
    console.log("countung start");
  const db = getDataBase();
  db.allDocs({
    include_docs: true,
    attachments: true,
  })
    .then(function (result) {
      console.log(result);
    })
    .catch(function (err) {
      console.log(err);
    });
};
