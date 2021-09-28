import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import i18n from "I18n/i18n.config";
import { I18nextProvider } from "react-i18next";
import Root from "Core/root";
import storePre, { history } from "Redux/store/store";
/* import { init } from "@sentry/browser"; 
init({
  dsn: 'https://86f00960ba714e308c4620f1e4b848b7@o359540.ingest.sentry.io/5802035', 
}); */

//client.captureException(new Error("example"));

/* import * as Sentry from "@sentry/electron"; 
Sentry.init({ dsn: "https://86f00960ba714e308c4620f1e4b848b7@o359540.ingest.sentry.io/5802035" });  */

//import "bulma/css/bulma.css";
const { persistor, store } = storePre;

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Suspense fallback="loading">
      <Root persistor={persistor} store={store} history={history}></Root>
    </Suspense>
  </I18nextProvider>,
  document.getElementById("target")
);
