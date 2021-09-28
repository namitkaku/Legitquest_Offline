import { senitizeAnyArray } from "../../utils/common";
import {
  START_LOADING,
  STOP_LOADING,
  TOGGLE_LEFT_MENU,
  TOGGLE_TOP_FILTER,
  SET_SEARCHED_QUERY,
  SET_SELECTED_SEARCH_TYPE,
  SET_OPEN_FILTER,
  SET_ACTIVE_FILTER,
  SET_ACTIVE_FILTER_COURT_NAME,
  TOGGLE_IDRAF_LIST,
  TOGGLE_PRINT_OPTION_MODAL,
  SET_OPEN_COURT_FILTER,
  RESET_OPEN_FILTER,
  MARK_SET_UP_DONE,
  SET_FOR_FILTER_FORM,
  SET_COURTS,
  SET_BENCHS,
  SET_SELECTED_YEAR,
  SET_SELECTED_STATE,
  SET_SELECTED_COURT,
  SET_SELECTED_BENCH
} from "../components/app-state/appStateAction";

const initialState = {
  isLoading: false,
  leftMenuOpen: false,
  topFilterVisiable: false,
  searchedQuery: "",
  searchType: "freetext",
  multiFilterSelected: [],
  activeFilters: {},
  filtredCourtName: "",
  IdrafListOpen: false,
  showPrintOptionModal: false,
  selectedCourtFilters: [], // for active courts only,
  setUpCompleted: false,
  courtList: [],
  benchList: [],
  selectedState: null,
  selectedYear: null,
  selectedCourt: null,
  selectedBench: null,
  searchQueryWithFilters: {
    courtList: [],
    benchList: [],
    yearList: [],
    bench: "",
    year: "",
    court: ""
    /* selectedCourtId:"",
    selectedBenchId:"",
    selectedYearId:"" */
  }
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_BENCH:
      return {
        ...state,
        selectedBench: action.payload
      };

    case SET_SELECTED_COURT:
      return {
        ...state,
        selectedCourt: action.payload
      };

    case SET_SELECTED_STATE:
      return {
        ...state,
        selectedState: action.payload
      };

    case SET_SELECTED_YEAR:
      return {
        ...state,
        selectedYear: action.payload
      };

    case SET_BENCHS:
      return {
        ...state,
        benchList: action.payload
      };
    case SET_COURTS:
      return {
        ...state,
        courtList: action.payload
      };
    case SET_FOR_FILTER_FORM:
      return {
        ...state,
        searchQueryWithFilters: {
          ...state.searchQueryWithFilters,
          ...action.payload
        }
      };
    case MARK_SET_UP_DONE:
      return {
        ...state,
        setUpCompleted: true
      };
    case RESET_OPEN_FILTER:
      return {
        ...state,
        multiFilterSelected: []
      };
    case START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case SET_OPEN_COURT_FILTER:
      const { clearNow } = action.payload;
      let tmpFil = [];
      if (!clearNow) {
        tmpFil = [...state.selectedCourtFilters, action.payload];
      }
      return {
        ...state,
        selectedCourtFilters: [...tmpFil]
      };

    case TOGGLE_PRINT_OPTION_MODAL:
      return {
        ...state,
        showPrintOptionModal: action.payload
      };

    case TOGGLE_IDRAF_LIST:
      return {
        ...state,
        IdrafListOpen: action.payload
      };

    case SET_ACTIVE_FILTER:
      return {
        ...state,
        activeFilters: action.payload
      };

    case SET_ACTIVE_FILTER_COURT_NAME:
      return {
        ...state,
        filtredCourtName: action.payload
      };

    case SET_OPEN_FILTER:
      const multiFilterSelected = senitizeAnyArray(action.payload, [
        ...state.multiFilterSelected
      ]);
      return {
        ...state,
        multiFilterSelected
      };

    case STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case TOGGLE_LEFT_MENU:
      return {
        ...state,
        leftMenuOpen: action.payload
      };
    case TOGGLE_TOP_FILTER:
      return {
        ...state,
        topFilterVisiable: action.payload
      };

    case SET_SEARCHED_QUERY:
      return {
        ...state,
        searchedQuery: action.payload
      };

    case SET_SELECTED_SEARCH_TYPE:
      return {
        ...state,
        searchType: action.payload
      };

    default:
      return state;
  }
}
