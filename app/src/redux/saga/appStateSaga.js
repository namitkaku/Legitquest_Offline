import { put, takeLatest } from "redux-saga/effects";
import {
  GET_DETAIL_SEARCH_FORM_WITH_LOCAL,
  GET_COURT_LIST,
  GET_BENCH_LIST
} from "../../api/ApiList";
import { sqlify, cleanString } from "Utils/common";
import {
  FETCH_FOR_FILTER_FORM,
  GET_BENCHS,
  GET_COURTS,
  SET_BENCHS,
  SET_COURTS,
  SET_FOR_FILTER_FORM
} from "../components/app-state/appStateAction";
import { TOGGLE_ERROR } from "../components/errors/errors";

export function* workerGetDataForFilterForm(action) {
  let info = action.payload;
  if (info?.bench) {
    const tmpBench = sqlify(info?.bench);
    console.log("IN workerGetDataForFilterForm", tmpBench);
    info.bench = tmpBench;
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({ ...info });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const result = yield fetch(
    GET_DETAIL_SEARCH_FORM_WITH_LOCAL,
    requestOptions
  ).then((response) => response.json());

  try {
    yield put({
      type: SET_FOR_FILTER_FORM,
      payload: result
    });
  } catch (error) {}
}
export function* watcherGetDataForFilterForm() {
  yield takeLatest(FETCH_FOR_FILTER_FORM, workerGetDataForFilterForm);
}

export function* workerGetCourts(action) {
  let info = action.payload;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({ ...info });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const { list, error, message } = yield fetch(
    GET_COURT_LIST,
    requestOptions
  ).then((response) => response.json());

  try {
    if (!error) {
      yield put({ type: SET_COURTS, payload: list });
    } else {
      //console.log("IN ELSE");
      yield    put({ type: TOGGLE_ERROR, payload: { hasError: true, errorMessage:   error?.sqlMessage } });
    }
  } catch (error) {
     
  }
}
export function* watcherGetCourts() {
  yield takeLatest(GET_COURTS, workerGetCourts);
}

export function* workerGetBenchList(action) {
  let info = action.payload;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({ ...info });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const { list,error,message } = yield fetch( GET_BENCH_LIST, requestOptions ).then((response) => response.json());
  console.log({ list });
  try {
    if(!error){
      yield put({
        type: SET_BENCHS,
        payload: list
      });
    }else{
      yield    put({ type: TOGGLE_ERROR, payload: { hasError: true, errorMessage:   error?.sqlMessage } });
    }
    
  } catch (error) {}
}
export function* watcherGetBenchList() {
  yield takeLatest(GET_BENCHS, workerGetBenchList);
}
