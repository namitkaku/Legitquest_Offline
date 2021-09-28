export const SEARCH_TYPE_HEAD = "SEARCH_TYPE_HEAD";
export const SET_SEARCHED_TYPE_HEAD = "SET_SEARCHED_TYPE_HEAD";

export const GET_RESULT_FOR_SELECTED_TEXT = "GET_RESULT_FOR_SELECTED_TEXT";
export const GET_RESULT_FOR_SELECTED_TEXT_WITH_FILTER = "GET_RESULT_FOR_SELECTED_TEXT_WITH_FILTER";
export const SET_RESULT_FOR_SELECTED_TEXT = "SET_RESULT_FOR_SELECTED_TEXT";
export const SET_RESULT_SORT_BY = "SET_RESULT_SORT_BY";
export const SET_FILTER_LIST = "SET_FILTER_LIST";
export const REMOVE_FILTER_LIST = "REMOVE_FILTER_LIST";
export const SET_PAGE_NUMBER = "SET_PAGE_NUMBER";
export const PAGE_NUMBER_CHANGE = "PAGE_NUMBER_CHANGE";
export const SEARCH_WITH_FILTERS = "SEARCH_WITH_FILTERS";
export const QUERY_TO_SEARCH = "QUERY_TO_SEARCH";
export const SET_SELECTED_I_DRAF = "SET_SELECTED_I_DRAF";
export const searchTypeHead = (query) => ({
  type: SEARCH_TYPE_HEAD,
  payload: query,
});

export const getResultForSelectedText = (query, topFilter) => ({
  type: GET_RESULT_FOR_SELECTED_TEXT,
  payload: query /* { query: query, topFilter: topFilter } */,
});

export const queryToSearch = (query) => ({
  type: QUERY_TO_SEARCH,
  payload: query,
});
export const setSortBy = (sort) => ({
  type: SET_RESULT_SORT_BY,
  payload: sort,
});

export const setFilterList = (filterList) => ({
  type: SET_FILTER_LIST,
  payload: filterList,
});

export const removeFilterFromList = (filter) => ({
  type: REMOVE_FILTER_LIST,
  payload: filter,
});

export const setPageNumber = (pageNumber) => ({
  type: SET_PAGE_NUMBER,
  payload: pageNumber,
});

export const onPageNumberChange = (queryData) => ({
  type: PAGE_NUMBER_CHANGE,
  payload: queryData,
});
export const searchWithFilters = (queryData) => ({
  type: SEARCH_WITH_FILTERS,
  payload: queryData,
});

export const setSelectedIdraf = (idrafItem) => ({
  type: SET_SELECTED_I_DRAF,
  payload: idrafItem,
});

export const setTypeHeadResults = (results) => ({
  type: SET_SEARCHED_TYPE_HEAD,
  payload: results,
});



export const getResultForSelectedTextWithFilterForm = (query) => ({
  type: GET_RESULT_FOR_SELECTED_TEXT_WITH_FILTER,
  payload: query /* { query: query, topFilter: topFilter } */,
});


