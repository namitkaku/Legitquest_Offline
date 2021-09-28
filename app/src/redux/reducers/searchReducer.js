import { filterKeys } from "../../utils/appConst";
import {
  SET_SEARCHED_TYPE_HEAD,
  SET_RESULT_FOR_SELECTED_TEXT,
  QUERY_TO_SEARCH,
  SET_RESULT_SORT_BY,
  SET_FILTER_LIST,
  SET_PAGE_NUMBER,
  SET_SELECTED_I_DRAF,
} from "../components/search/searchActions";

const initialState = {
  searchResults: [],
  searchResultsForSelectedText: [],
  queryToSearch: "",
  caseResultsCount: 0,
  sortBy: 1,
  filterValueList: "",
  filterList: [],
  numberOfPages: 0,
  currentPage: 1,
  sideFiltersList: [],
  YearList: "",
  DecStatusList: "",
  BenchList: "",
  CourtList: [],
  IdrafList: [],
  IdrafSelected: "",
};
export default function (state = initialState, action) { 
  switch (action.type) {
    case SET_SEARCHED_TYPE_HEAD:
      return {
        ...state,
        searchResults: action.payload,
      };
    case SET_SELECTED_I_DRAF:
      return {
        ...state,
        IdrafSelected: action.payload,
      };

    case SET_RESULT_FOR_SELECTED_TEXT:
      let tmpFilters = [];
      let tmpFiltersObj = {};  
      filterKeys.map((item) => {
        if (action.payload[item]) {
          tmpFilters.push({ [item]: action.payload[item] });
          tmpFiltersObj[item] =  action.payload[item] 
        }
      });
       
      let courts = [];
      ["SupremeCourtList", "HighCourtList", "OtherCourtList"].map((item) => {
        if (action.payload?.[item]) {
          courts.push({ [item]: action.payload?.[item] });
        }
      });
      //console.log("tmpFilters",tmpFilters,"tmpFiltersObj",tmpFiltersObj);
      const { fromPagination } = action.payload;
      return {
        ...state,
        searchResultsForSelectedText: action.payload,
        caseResultsCount: action.payload.CaseCount >= 0
          ? action.payload.CaseCount
          :  state.caseResultsCount,
        numberOfPages: action?.payload?.CaseCount >= 0
          ? Number(action.payload.CaseCount).toFixed()
          : state.numberOfPages,
        sideFiltersList: fromPagination
          ? state.sideFiltersList
          : [...tmpFilters],
        CourtList: fromPagination ? state.CourtList : [...courts],
        IdrafList: action?.payload?.IdrafList ? action?.payload?.IdrafList : [],
      };
    case QUERY_TO_SEARCH:
      return {
        ...state,
        queryToSearch: action.payload,
      };
    case SET_RESULT_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      };
    case SET_PAGE_NUMBER:
      return {
        ...state,
        currentPage: action.payload,
      };

    case SET_FILTER_LIST:
      const { filterValueList, adding } = action.payload;

      let filterList = "";
      if (adding) {
        if (!state.filterValueList?.split(",").includes(filterValueList))
          filterList =
            state.filterValueList?.length > 1
              ? `${state.filterValueList},${filterValueList.trim()}`
              : filterValueList.trim();
        else {
          filterList = state.filterValueList;
        }
      } else {
        state.filterValueList?.split(",").map((item) => {
          if (item != filterValueList.trim() && item.trim()?.length > 1) {
            filterList += `${item},`;
          }
        });
      }

      filterList = filterList.replace(/,\s*$/, "");
      /*  console.log("filterList",filterList);
       console.log("filterValueList",[...filterList?.split(",")]); */
      return {
        ...state,
        filterValueList: filterList,
        filterList: filterList ? [...filterList?.split(",")] : [], //filterList.length> 1  ?[...filterList?.split(",")] :[]
      };
    default:
      return state;
  }
}
