import {  all } from "redux-saga/effects"
import { watcherGetBenchList, watcherGetCourts, watcherGetDataForFilterForm } from "./appStateSaga"
import { watcherPageNumberChange, watcherSearchByFilters, watcherSearchResultBySelectedText, watcherSearchResultBySelectedTextForFormFilter, watcherSearchTypeHead } from "./searchSaga"

//3 root saga
//single entry point to start all sagas
export default function* rootSaga() {
  yield all([ 
    watcherSearchTypeHead(),
    watcherSearchResultBySelectedText(),
    watcherPageNumberChange(),
    watcherSearchByFilters(),
    watcherGetDataForFilterForm(),
    watcherSearchResultBySelectedTextForFormFilter(),
    watcherGetCourts(),
    watcherGetBenchList()
  ])
}
