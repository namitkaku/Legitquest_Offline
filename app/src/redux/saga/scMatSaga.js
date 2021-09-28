import { put, takeLatest } from "redux-saga/effects";
import { GET_RESULT_BY_SECONDARY_MATERIAL } from "../../api/ApiList";
import { SET_ACTIVE_FILTER, SET_ACTIVE_FILTER_COURT_NAME, SET_OPEN_COURT_FILTER, SET_OPEN_FILTER, START_LOADING, STOP_LOADING, TOGGLE_IDRAF_LIST } from "../components/app-state/appStateAction";
import { TOGGLE_SC_MAT_ITEM } from "../components/sc-material";
import { SET_RESULT_FOR_SELECTED_TEXT, SET_SELECTED_I_DRAF } from "../components/search/searchActions";
 
export function* workerGetByScMat(action) {
    const {query,value,doNotRun} =action.payload
    yield put({ type: START_LOADING });

    yield put({ type: SET_OPEN_FILTER, payload: [] });
    yield put({ type: SET_ACTIVE_FILTER, payload: {} });
    yield put({ type: SET_ACTIVE_FILTER_COURT_NAME, payload: "" }); 
    yield put({ type: SET_OPEN_COURT_FILTER, payload:{clearNow:true} });
    yield put({ type: TOGGLE_IDRAF_LIST, payload: false  });
    yield put({ type: SET_SELECTED_I_DRAF, payload: ''  });


    
    if(!doNotRun){
        const URL = `${GET_RESULT_BY_SECONDARY_MATERIAL}caseText=${query}&searchType=${value}`; 
    let results = yield fetch(URL).then((response) => response.json()); 
    try {
        if (results) { 
            yield put({
                type: SET_RESULT_FOR_SELECTED_TEXT,
                payload:  results ,
              });
              yield put({ type: STOP_LOADING });

         
         
      }  
    } catch (error) { 
      console.log("error in workerGetByScMat", error);
    } } 
  }
  export function* watcherGetByScMat() {
    yield takeLatest(TOGGLE_SC_MAT_ITEM, workerGetByScMat);
  }