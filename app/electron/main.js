const {
  app,
  protocol,
  BrowserWindow,
  session,
  ipcMain,
  Menu,
  Notification,
  ipcRenderer,
} = require("electron");
const {
  default: installExtension,
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS,
} = require("electron-devtools-installer");
const Protocol = require("./protocol");
const MenuBuilder = require("./menu");
const i18nextBackend = require("i18next-electron-fs-backend");
const i18nextMainBackend = require("../localization/i18n.mainconfig");
const Store = require("secure-electron-store").default;
const ContextMenu = require("secure-electron-context-menu").default;
const path = require("path");
const fs = require("fs");
const isDev =   process.env.NODE_ENV === "development";
const port = 40992; // Hardcoded; needs to match webpack.development.js and package.json
const selfHost = `http://localhost:${port}`;
const { download } = require("electron-dl");
const SendNotification = require("./Notifier");
var child_process = require("child_process");

//import ptp from "pdf-to-printer";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let menuBuilder;
ipcMain.on("download-file", async (event, info) => {
  /* const win = BrowserWindow.getFocusedWindow(); 
  await download(win, info.url, {directory: "app/my-downloads"})
  .then(dl =>  event.reply('onDownloadComplete', {status: true, message:'Download complete', path: dl.getSavePath()}) ); 
  SendNotification({ title: "File Downloaded", body: "File downloaded successfully completed" }) */
});

ipcMain.on("run-dump-export", async (event, info) => {
  const { filePath, dbUserName, dbpass, dbName } = info;
  let DUMP_QUERY = "";
  if (process.platform === "win32") {
    //DUMP_QUERY= `C:\\xampp\\mysql\\bin\\mysql.exe  -u admin -padmin123 -e"use ${dbName}; source ${filePath}; select 'IMPORT_DONE' AS IMPORT_STATUS;"` 
    DUMP_QUERY=`C:\\xampp\\mysql\\bin\\mysql.exe  -u admin -padmin123 ${dbName} < ${filePath}`
  }
  else if(process.platform === "darwin") {  
    DUMP_QUERY = `/Applications/xampp/xamppfiles/bin/mysql -u admin -padmin123 << EOF
     use ${dbName};  
     source ${filePath}; 
     select 'IMPORT_DONE' AS IMPORT_STATUS;
  `;
  } else {
    
    DUMP_QUERY = `mysql -u admin -padmin123 << EOF
     use ${dbName};  
     source ${filePath}; 
     select 'IMPORT_DONE' AS IMPORT_STATUS;
  `;
  }
  child_process.exec(DUMP_QUERY, function (error, stdout, stderr) {
    console.log({error, stdout, stderr});
    if (error)
      event.reply("on-run-dump-export-complete", {
        status: false,
        message: "Something went wrong",
        error,
        dumpQuery:DUMP_QUERY
      });
    if (stderr)
      event.reply("on-run-dump-export-complete", {
        status: false,
        message: "Something went wrong",
        error:stderr,
        dumpQuery:DUMP_QUERY
      });
    if (stdout) {
      console.log("stdout",stdout);
      event.reply("on-run-dump-export-complete", {
        status: true,
        message: stdout,
        error:false,
        dumpQuery:DUMP_QUERY
      });
    }
  });
});

ipcMain.on("dump-database", async (event, info) => {
  const { sqlDumPath } = info;
  console.log("dump-database", sqlDumPath);
  event.reply("onDumpSelectionComplete", {
    status: true,
    message: "Dump Choosen",
    path: sqlDumPath,
  });
  /* child_process.exec(
    `mysql -u admin -padmin123 << EOF
  use lq_offline;  `,
    function (error, stdout, stderr) {
      if (error) console.log({ error });
      console.log(stdout);
    }
  ); */
});

ipcMain.on("download-elastic-file", async (event, info) => {
  const win = BrowserWindow.getFocusedWindow();

  /* await download(win, info.url, {directory: "app/my-downloads/es"})
  .then(async dl =>  {
  
    await Extractor(dl.getSavePath())
    event.reply('onElasticDownloadComplete', {status: true, message:'Download complete', path: dl.getSavePath()})
  
  } ); */

  SendNotification({
    title: "File Downloaded",
    body: "File downloaded successfully completed",
  });
});

async function createWindow() {
  // If you'd like to set up auto-updating for your app,
  // I'd recommend looking at https://github.com/iffy/electron-updater-example
  // to use the method most suitable for you.
  // eg. autoUpdater.checkForUpdatesAndNotify();

  if (!isDev) {
    // Needs to happen before creating/loading the browser window;
    // protocol is only used in prod
    protocol.registerBufferProtocol(
      Protocol.scheme,
      Protocol.requestHandler
    ); /* eng-disable PROTOCOL_HANDLER_JS_CHECK */
  }

  const store = new Store({
    path: app.getPath("userData"),
  });

  // Use saved config values for configuring your
  // BrowserWindow, for instance.
  // NOTE - this config is not passcode protected
  // and stores plaintext values
  //let savedConfig = store.mainInitialStore(fs);

  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Legitquest is currently initializing...",
    webPreferences: {
      devTools: true, ///for debug
      webSecurity: false,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      contextIsolation: true,
      enableRemoteModule: true,
      additionalArguments: [`storePath:${app.getPath("userData")}`],
      preload: path.join(
        __dirname,
        "preload.js"
      ) /* eng-disable PRELOAD_JS_CHECK */,
      disableBlinkFeatures: "Auxclick",
    },
  });

  // Sets up main.js bindings for our i18next backend
  i18nextBackend.mainBindings(ipcMain, win, fs);

  // Sets up main.js bindings for our electron store;
  // callback is optional and allows you to use store in main process
  const callback = function (success, initialStore) {
    console.log(
      `${!success ? "Un-s" : "S"}uccessfully retrieved store in main process.`
    );
    console.log({ initialStore }); // {"key1": "value1", ... }
  };

  store.mainBindings(ipcMain, win, fs, callback);

  // Sets up bindings for our custom context menu
  ContextMenu.mainBindings(ipcMain, win, Menu, isDev, {
    loudAlertTemplate: [
      {
        id: "loudAlert",
        label: "AN ALERT!",
      },
    ],
    softAlertTemplate: [
      {
        id: "softAlert",
        label: "Soft alert",
      },
    ],
  });

  // Load app
  if (isDev) {
    win.loadURL(selfHost);
  } else {
    win.loadURL(`${Protocol.scheme}://rse/index.html`);
  }

  win.webContents.on("did-finish-load", () => {
    win.setTitle(`Legitquest (v${app.getVersion()})`);
  });

  // Only do these things when in development
  if (isDev) {
    // Errors are thrown if the dev tools are opened
    // before the DOM is ready
    win.webContents.once("dom-ready", async () => {
      await installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log("An error occurred: ", err))
        .finally(() => {
          require("electron-debug")(); // https://github.com/sindresorhus/electron-debug
          win.webContents.openDevTools();
        });
    });
  }

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  // https://electronjs.org/docs/tutorial/security#4-handle-session-permission-requests-from-remote-content
  const ses = session;
  const partition = "default";
  ses
    .fromPartition(
      partition
    ) /* eng-disable PERMISSION_REQUEST_HANDLER_JS_CHECK */
    .setPermissionRequestHandler((webContents, permission, permCallback) => {
      let allowedPermissions = []; // Full list here: https://developer.chrome.com/extensions/declare_permissions#manifest

      if (allowedPermissions.includes(permission)) {
        permCallback(true); // Approve permission request
      } else {
        console.error(
          `The application tried to request permission for '${permission}'. This permission was not whitelisted and has been blocked.`
        );

        permCallback(false); // Deny
      }
    });

  // https://electronjs.org/docs/tutorial/security#1-only-load-secure-content;
  // The below code can only run when a scheme and host are defined, I thought
  // we could use this over _all_ urls
  // ses.fromPartition(partition).webRequest.onBeforeRequest({urls:["http://localhost./*"]}, (listener) => {
  //   if (listener.url.indexOf("http://") >= 0) {
  //     listener.callback({
  //       cancel: true
  //     });
  //   }
  // });

  menuBuilder = MenuBuilder(win, app.name);

  // Set up necessary bindings to update the menu items
  // based on the current language selected
  i18nextMainBackend.on("loaded", (loaded) => {
    i18nextMainBackend.changeLanguage("en");
    i18nextMainBackend.off("loaded");
  });

  i18nextMainBackend.on("languageChanged", (lng) => {
    menuBuilder.buildMenu(i18nextMainBackend);
  });
}

// Needs to be called before app is ready;
// gives our scheme access to load relative files,
// as well as local storage, cookies, etc.
// https://electronjs.org/docs/api/protocol#protocolregisterschemesasprivilegedcustomschemes
protocol.registerSchemesAsPrivileged([
  {
    scheme: Protocol.scheme,
    privileges: {
      standard: true,
      secure: true,
    },
  },
]);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  } else {
    i18nextBackend.clearMainBindings(ipcMain);
    ContextMenu.clearMainBindings(ipcMain);
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// https://electronjs.org/docs/tutorial/security#12-disable-or-limit-navigation
app.on("web-contents-created", (event, contents) => {
  contents.on("will-navigate", (contentsEvent, navigationUrl) => {
    /* eng-disable LIMIT_NAVIGATION_JS_CHECK  */
    const parsedUrl = new URL(navigationUrl);
    const validOrigins = [selfHost];

    // Log and prevent the app from navigating to a new page if that page's origin is not whitelisted
    if (!validOrigins.includes(parsedUrl.origin)) {
      console.error(
        `The application tried to redirect to the following address: '${parsedUrl}'. This origin is not whitelisted and the attempt to navigate was blocked.`
      );

      contentsEvent.preventDefault();
      return;
    }
  });

  contents.on("will-redirect", (contentsEvent, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    const validOrigins = [];

    // Log and prevent the app from redirecting to a new page
    if (!validOrigins.includes(parsedUrl.origin)) {
      console.error(
        `The application tried to redirect to the following address: '${navigationUrl}'. This attempt was blocked.`
      );

      contentsEvent.preventDefault();
      return;
    }
  });

  // https://electronjs.org/docs/tutorial/security#11-verify-webview-options-before-creation
  contents.on(
    "will-attach-webview",
    (contentsEvent, webPreferences, params) => {
      // Strip away preload scripts if unused or verify their location is legitimate
      delete webPreferences.preload;
      delete webPreferences.preloadURL;

      // Disable Node.js integration
      webPreferences.nodeIntegration = false;
    }
  );

  // https://electronjs.org/docs/tutorial/security#13-disable-or-limit-creation-of-new-windows

  contents.on("new-window", (contentsEvent, navigationUrl) => {
    /* eng-disable LIMIT_NAVIGATION_JS_CHECK */
    const parsedUrl = new URL(navigationUrl);
    const validOrigins = [];

    // Log and prevent opening up a new window
    if (!validOrigins.includes(parsedUrl.origin)) {
      console.error(
        `The application tried to open a new window at the following address: '${navigationUrl}'. This attempt was blocked.`
      );

      contentsEvent.preventDefault();
      return;
    }
  });
});

// Filter loading any module via remote;
// you shouldn't be using remote at all, though
// https://electronjs.org/docs/tutorial/security#16-filter-the-remote-module
/* app.on("remote-require", (event, webContents, moduleName) => {
  event.preventDefault();
}); 
app.on("remote-get-builtin", (event, webContents, moduleName) => {
  event.preventDefault();
});

app.on("remote-get-global", (event, webContents, globalName) => {
  event.preventDefault();
});

app.on("remote-get-current-window", (event, webContents) => {
  event.preventDefault();
});

app.on("remote-get-current-web-contents", (event, webContents) => {
  event.preventDefault();
}); */
