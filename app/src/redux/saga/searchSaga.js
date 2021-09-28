import { put, takeLatest, takeEvery } from "redux-saga/effects";
import {
  SEARCH_BY_WORD,
  GET_RESULT_FOR_SELECTED_TEXT_URL,
  SEARCH_RESULT_BY_PAGE_NUMBER,
  RESULTS_BY_FILTER,
  SEARCH_TYPEHEAD_WITH_LOCAL,
  SEC_MATERIAL,
  GET_RESULT_FOR_SELECTED_TEXT_WITH_LOCAL,
  GET_RESULT_FOR_SELECTED_TEXT_WITH_LOCAL_FILTER_FORM,
  //SEARCH_WITH_ELASTIC_TYPEHEAD
} from "../../api/ApiList";
import { cleanString, getSanitisedFilterString } from "../../utils/common";
import {
  RESET_OPEN_FILTER,
  SET_ACTIVE_FILTER,
  SET_ACTIVE_FILTER_COURT_NAME,
  SET_OPEN_COURT_FILTER,
  SET_OPEN_FILTER,
  SET_SEARCHED_QUERY,
  START_LOADING,
  STOP_LOADING,
  TOGGLE_IDRAF_LIST,
} from "../components/app-state/appStateAction";
import { TOGGLE_ERROR } from "../components/errors/errors";
import { RESET_FILTERS } from "../components/sc-material";
import {
  SEARCH_TYPE_HEAD,
  SET_SEARCHED_TYPE_HEAD,
  GET_RESULT_FOR_SELECTED_TEXT,
  SET_RESULT_FOR_SELECTED_TEXT,
  PAGE_NUMBER_CHANGE,
  SET_PAGE_NUMBER,
  SEARCH_WITH_FILTERS,
  SET_SELECTED_I_DRAF,
  GET_RESULT_FOR_SELECTED_TEXT_WITH_FILTER,
} from "../components/search/searchActions";

export function* workerSearchTypeHead(action) {
  const { query, searchType } = action.payload;
  const URL = `${SEARCH_TYPEHEAD_WITH_LOCAL}${cleanString( query)}/${searchType}`;
  let results = yield fetch(URL).then((response) => response.json());

  try {
    if (results && searchType != "bench") {
      yield put({
        type: SET_SEARCHED_TYPE_HEAD,
        payload: results?.data?.resultsList,
      });
    }
  } catch (error) {
    console.log("error in workerSearchTypeHead", error);
  }
}
export function* watcherSearchTypeHead() {
  yield takeLatest(SEARCH_TYPE_HEAD, workerSearchTypeHead);
}

export function* workerSearchResultBySelectedText(action) {
  const {
    secondrayMaterial,
    doNotClearFilter,
    query,
    searchType,
    sortBy,
    filterList,
    pageNumber,
  } = action.payload;

  yield put({ type: START_LOADING });
  if (!doNotClearFilter) {
    yield put({ type: SET_OPEN_FILTER, payload: [] });
    yield put({ type: SET_ACTIVE_FILTER, payload: {} });
    yield put({ type: SET_ACTIVE_FILTER_COURT_NAME, payload: "" });
    yield put({ type: SET_OPEN_COURT_FILTER, payload: { clearNow: true } });
    yield put({ type: TOGGLE_IDRAF_LIST, payload: false });
    yield put({ type: SET_SELECTED_I_DRAF, payload: "" });
    yield put({ type: RESET_FILTERS });
    yield put({ type: RESET_OPEN_FILTER });

    yield put({
      type: SET_PAGE_NUMBER,
      payload: 1,
    });
  }
  

  yield put({ type: SET_SEARCHED_QUERY, payload:  cleanString(query) });
  let URL = `${GET_RESULT_FOR_SELECTED_TEXT_WITH_LOCAL}${ cleanString(query)}/${searchType}/${sortBy}/${
    pageNumber ? pageNumber : 1
  }`;
  /* let URL = `${GET_RESULT_FOR_SELECTED_TEXT_URL}type=${
    searchType ? searchType : "freetext"
  }&caseText=${query}&&sortBy=${
    sortBy ? sortBy : 1
  }&formattedCitation=&removeFilter=&${
    filterList ? getSanitisedFilterString(filterList) : ""
  }`;
  if(secondrayMaterial>0 ){
    URL= `${SEC_MATERIAL}caseText=${query}&searchType=${secondrayMaterial}`
  } */

  //console.log("URL", URL);

  const results = yield fetch(URL).then((response) => response.text());

  try {
    if (results && JSON.parse(results)) {
      //console.log("JSON.parse(results)", JSON.parse(results));
      yield put({
        type: SET_RESULT_FOR_SELECTED_TEXT,
        payload: JSON.parse(results),
      });
      yield put({ type: STOP_LOADING });
    }
  } catch (error) {
    yield put({ type: STOP_LOADING });
    console.log("error in workerSearchResultBySelectedText", error);
  }
}
export function* watcherSearchResultBySelectedText() {
  yield takeLatest(
    GET_RESULT_FOR_SELECTED_TEXT,
    workerSearchResultBySelectedText
  );
}

export function* workerPageNumberChange(action) {
  const { query, searchType, sortBy, filterList, pageNumber, activeFilters } =
    action.payload;
  //console.log("action.payload", action.payload);
  yield put({ type: START_LOADING });
  const jsonData = {
    SearchText: query ? cleanString( query) : "",
    SearchType: searchType ? searchType : "freetext",
    BenchArray: "",
    Idrafarray: "",
    Yeararray: "",
    PageNo: pageNumber ? pageNumber : "",
    Partyarray: "",
    Decisionarray: "",
    SelectedFilter: "",
    Filter: "",
    SortBy: sortBy ? sortBy : "1",
    Courtarray: "",
    RemoveFilter: "",
    FilterValueList: filterList ? filterList.join(",") : "",
    ...activeFilters,
  };
  //console.log("workerPageNumberChange", jsonData);
  var raw = JSON.stringify(jsonData);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const results = yield fetch(
    SEARCH_RESULT_BY_PAGE_NUMBER,
    requestOptions
  ).then((response) => response.text());
  try {
    if (results && JSON.parse(results)) {
      yield put({
        type: SET_RESULT_FOR_SELECTED_TEXT,
        payload: { ...JSON.parse(results), fromPagination: true },
      });
      yield put({ type: STOP_LOADING });
    }
  } catch (error) {
    yield put({ type: STOP_LOADING });
    console.log("error in workerPageNumberChange", error);
  }
}
export function* watcherPageNumberChange() {
  yield takeLatest(PAGE_NUMBER_CHANGE, workerPageNumberChange);
}

export function* workerSearchByFilters(action) {
  const {
    filterData,
    query,
    searchType,
    sortBy,
    filterList,
    callBack,
    tabToOpen,
  } = action.payload;

  yield put({ type: START_LOADING });

  const jsonData = {
    SearchText:cleanString( query),
    SearchType: searchType,

    SortBy: sortBy?.toString(),
    Yeararray: "",
    //PageNo:"",
    ...filterData,
    PageNo: 1,
  };
  //console.log("jsonData", jsonData);
  var raw = JSON.stringify(jsonData);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  // console.log("raw", raw);
  const results = yield fetch(RESULTS_BY_FILTER, requestOptions).then(
    (response) => response.text()
  );

  yield put({
    type: SET_PAGE_NUMBER,
    payload: 1,
  });

  try {
    if (results && JSON.parse(results)) {
      yield put({
        type: SET_RESULT_FOR_SELECTED_TEXT,
        payload: JSON.parse(results),
      });
      yield put({ type: STOP_LOADING });
      callBack && callBack(tabToOpen);
    }
  } catch (error) {
    yield put({ type: STOP_LOADING });
    console.log("error in workerSearchByFilters", error);
  }
}
export function* watcherSearchByFilters() {
  yield takeLatest(SEARCH_WITH_FILTERS, workerSearchByFilters);
}

export function* workerSearchResultBySelectedTextForFormFilter(action) {
  const {
    doNotClearFilter,
    query,
    type,
    sortBy,
    pageNumber,
    court,
    year,
    bench,
    state,
  } = action.payload;
 // console.log(action.payload);
  yield put({ type: START_LOADING });
  if (!doNotClearFilter) {
    yield put({ type: SET_OPEN_FILTER, payload: [] });
    yield put({ type: SET_ACTIVE_FILTER, payload: {} });
    yield put({ type: SET_ACTIVE_FILTER_COURT_NAME, payload: "" });
    yield put({ type: SET_OPEN_COURT_FILTER, payload: { clearNow: true } });
    yield put({ type: TOGGLE_IDRAF_LIST, payload: false });
    yield put({ type: SET_SELECTED_I_DRAF, payload: "" });
    yield put({ type: RESET_FILTERS });
    yield put({ type: RESET_OPEN_FILTER });

    yield put({
      type: SET_PAGE_NUMBER,
      payload: 1,
    });
  }

  yield put({ type: SET_SEARCHED_QUERY, payload:cleanString( query) });
  let URL = `${GET_RESULT_FOR_SELECTED_TEXT_WITH_LOCAL_FILTER_FORM}`;

  var raw = JSON.stringify({
    query : cleanString(query), /// NEEDS TO FIX 
    type,
    sortBy,
    pageNumber,
    court,
    year,
    bench, // : cleanString(bench), 
    state
  });
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json"); 
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  const results = yield fetch(URL, requestOptions).then((response) => response.json());

  try {
     
    if (!results.error) { 
      yield put({
        type: SET_RESULT_FOR_SELECTED_TEXT,
        payload:  results,
      });
      yield put({ type: STOP_LOADING });
    }else{
      yield put({ type: STOP_LOADING }); 
      yield put({ type: TOGGLE_ERROR, payload:{hasError:true,errorMessage:results.error?.sqlMessage}  });
     
     /* setTimeout(() => {
       put({ type: TOGGLE_ERROR, payload:{hasError:false,errorMessage:""}  });
     }, 3000 );  */


    }
  } catch (error) {
   
  }
}
export function* watcherSearchResultBySelectedTextForFormFilter() {
  yield takeLatest(
    GET_RESULT_FOR_SELECTED_TEXT_WITH_FILTER,
    workerSearchResultBySelectedTextForFormFilter
  );
}
