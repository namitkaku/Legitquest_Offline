import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createHashHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import rootReducer from "../reducers/rootReducer";
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga/rootSaga';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

export const history = createHashHistory();
const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: 'root',
  storage , 
     //blacklist:["search", "errors",    "appState","home" /**/  ] 
};
const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware,...getDefaultMiddleware({
    serializableCheck: false
  }), routerMiddleware(history)]
});
let persistor = persistStore(store);
sagaMiddleware.run(rootSaga);
export default {store,persistor};
