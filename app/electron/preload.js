require("./server");
const AuthUser = require("./AuthUser.ts");

const { contextBridge, ipcRenderer, remote } = require("electron");
const fs = require("fs");
const i18nextBackend = require("i18next-electron-fs-backend");
const Store = require("secure-electron-store").default;
const ContextMenu = require("secure-electron-context-menu").default;
const getmac = require("getmac");
const { getDataForTypeHead } = require("./HasMySql");

// Create the electron store to be made available in the renderer process
const store = new Store();
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  i18nextElectronBackend: i18nextBackend.preloadBindings(ipcRenderer),
  store: store.preloadBindings(ipcRenderer, fs),
  contextMenu: ContextMenu.preloadBindings(ipcRenderer),
  notificationApi: {
    sendNotification(message) {
      return { some: "data is here" };
    },
  },
  onLogin: {
    async verifyUser(corporate_id, email, password) {
      const MAC = getmac.default();
      return await AuthUser(corporate_id, email, password, MAC);
    },
  },
  downloadApi: {
    downloadFileNow(file, onComplete = null) {
      let info = file;
      ipcRenderer.send("download-file", info);
      ipcRenderer.on("onDownloadComplete", (event, info) => {
        onComplete && onComplete(event, info);
      });
    },
    async searchWithJson(QUERY, type, callBack) {},
    //downloadElasticFileNow
    async browserSqlDump(file, onComplete = null) {
      const { filePaths } = await remote.dialog.showOpenDialog({
        filters: [{ name: "SQL Dump", extensions: ["sql"] }],
        options: { properties: { multiSelections: false } },
      });
      const sqlDumPath = filePaths[0];
      ipcRenderer.send("dump-database", { sqlDumPath });
      ipcRenderer.on("onDumpSelectionComplete", (event, info) => {
        onComplete && onComplete(event, info);
      });
    },
  },
  setUpApi: {
    hasMySqlInsalled(username, password) {
      /* const respounce = HasMySql(username, password);
      return respounce; */
    },
    createDB(OnResults) {
      /* createDatabse(OnResults); */
    },
    readByQuery(callBack) {
      /* readData(callBack); */
    },
    runImport(info, onDone) { 
       //console.log({onDone});
       ipcRenderer.send("run-dump-export", info   );
       ipcRenderer.on("on-run-dump-export-complete", (event, info) => {
        onDone && onDone(event, info);
      });
    },
  },
  typeHeadApi: {
    getResult(query, callBack) {
      getDataForTypeHead({ query, callBack });
    },
  },
});

const senitizeResults = (query, str) => {
  const regexp = new RegExp(`${query}[a-z]*`, "g");
  const finalArray = Array.from(str.matchAll(regexp), (m) => m[0]);
  // Array [ "football", "foosball" ]
  return finalArray;
};
