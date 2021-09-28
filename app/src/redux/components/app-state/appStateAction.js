export const START_LOADING = "START_LOADING";
export const STOP_LOADING = "STOP_LOADING";
export const TOGGLE_LEFT_MENU = "TOGGLE_LEFT_MENU";
export const TOGGLE_TOP_FILTER = "TOGGLE_TOP_FILTER";
export const SET_SEARCHED_QUERY = "SET_SEARCHED_QUERY";
export const SET_OPEN_FILTER = "SET_OPEN_FILTER";
export const RESET_OPEN_FILTER = "RESET_OPEN_FILTER";
export const SET_ACTIVE_FILTER = "SET_ ACTIVE_FILTER";
export const SET_SELECTED_SEARCH_TYPE = "SET_SELECTED_SEARCH_TYPE";

export const SET_ACTIVE_FILTER_COURT_NAME = "SET_ ACTIVE_FILTER_COURT_NAME";
export const TOGGLE_IDRAF_LIST = "TOGGLE_IDRAF_LIST";
export const TOGGLE_PRINT_OPTION_MODAL = "TOGGLE_PRINT_OPTION_MODAL";

export const SET_OPEN_COURT_FILTER = "SET_OPEN_COURT_FILTER";
export const MARK_SET_UP_DONE = "MARK_SET_UP_DONE";
export const FETCH_FOR_FILTER_FORM = "FETCH_FOR_FILTER_FORM";
export const SET_FOR_FILTER_FORM = "SET_FOR_FILTER_FORM";

export const GET_COURTS = "GET_COURTS";
export const SET_COURTS = "SET_COURTS";

export const GET_BENCHS = "GET_BENCHS";
export const SET_BENCHS = "SET_BENCHS";



export const SET_SELECTED_STATE = "SET_SELECTED_STATE";
export const SET_SELECTED_YEAR = "SET_SELECTED_YEAR";
export const SET_SELECTED_BENCH = "SET_SELECTED_BENCH";
export const SET_SELECTED_COURT = "SET_SELECTED_COURT";



export const startLoading = () => ({
  type: START_LOADING,
});

export const stopLoading = () => ({
  type: STOP_LOADING,
});

export const toggleLeftMenu = (flag) => ({
  type: TOGGLE_LEFT_MENU,
  payload: flag,
});

export const toggleTopFilter = (flag) => ({
  type: TOGGLE_TOP_FILTER,
  payload: flag,
});

export const setSearchedQuery = (query) => ({
  type: SET_SEARCHED_QUERY,
  payload: query,
});

export const setSearchType = (filter) => ({
  type: SET_SELECTED_SEARCH_TYPE,
  payload: filter,
});

export const setMultiFilterSelectedRedux = (filter) => ({
  type: SET_OPEN_FILTER,
  payload: filter,
});

export const reSetMultiFilterSelectedRedux = () => ({
  type: RESET_OPEN_FILTER,
});

export const setActiveFilters = (filter) => ({
  type: SET_ACTIVE_FILTER,
  payload: filter,
});

export const setActiveCourt = (courtName) => ({
  type: SET_ACTIVE_FILTER_COURT_NAME,
  payload: courtName,
});
export const toggleIdraf = (flag) => ({
  type: TOGGLE_IDRAF_LIST,
  payload: flag,
});

export const togglePrintModal = (flag) => ({
  type: TOGGLE_PRINT_OPTION_MODAL,
  payload: flag,
});

export const setOpenCourtsFilter = (court) => ({
  type: SET_OPEN_COURT_FILTER,
  payload: court,
});

export const markSetupDone = () => ({
  type: MARK_SET_UP_DONE,
});

export const getDataForFilterForm = (info) => ({
  type: FETCH_FOR_FILTER_FORM,
  payload: info,
});

export const setDataForFilterForm = (info) => ({
  type: SET_FOR_FILTER_FORM,
  payload: info,
});

export const getCourts = (info) => ({
  type: GET_COURTS,
  payload: info,
});
export const getBenchs = (info) => ({
  type: GET_BENCHS,
  payload: info,
});


export const setSelectedState = (state) => ({
  type: SET_SELECTED_STATE,
  payload: state,
});

export const setSelectedYear = (Year) => ({
  type: SET_SELECTED_YEAR,
  payload: Year,
});

export const setSelectedBench = (Bench) => ({
  type: SET_SELECTED_BENCH,
  payload: Bench,
});

export const setSelectedCourt = (Court) => ({
  type: SET_SELECTED_COURT,
  payload: Court,
});

