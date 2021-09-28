const BASE_URL = 'https://www.legitquest.com/api/v1.0/';
const BASE_URL_WITH_ELASTIC = 'http://localhost:5000/'; //node server is also running on same port
export const TYPE_ACT = 'act-section';
export const TYPE_FREE_TEXT = 'freetext';
export const PARTY_NAME = "partyname";
export const JUDGE_NAME = "bench";
export const CITATION = "citation";
export const SEARCH_BY_KEY_WORDS = `${BASE_URL}SearchByKeyWords?type=${TYPE_FREE_TEXT}&searchString=`;
export const SEARCH_BY_WORD = `${BASE_URL}SearchByKeyWords?`;
export const GET_RESULT_FOR_SELECTED_TEXT_URL=`${BASE_URL}GetResultBySelectedSearchResult?` 
export const CASE_DETAIL = `${BASE_URL}case/`
export const SEARCH_WITH_IN_CASE=`${BASE_URL}GetResultByCaseIdForSearchWithinCase?`//caseId=1454CC&searchText=indian 
export const SEARCH_RESULT_BY_PAGE_NUMBER= `${BASE_URL}GetResultBySelectedSearchResultPageNo`  
export const RESULTS_BY_FILTER =`${BASE_URL}GetCaseDetailsByBenchFilter`  
export const IDEAF_CASE_DETAILS = `${BASE_URL}GetOcrDataByCitation/`  //caseId=MTBhZTA%3D&status=Cited(Total)&citation=all
export const CITATION_CASE_DETAILS = `${BASE_URL}GetOcrDataByCitedIn/`  //caseId=MTBhZTA%3D&status=Cited(Total)&citation=all

export const SEC_MATERIAL = `http://52.149.182.246/api/v1.0/GetResultBySecondaryMaterial?`
//caseText=court&searchType=11  

export const SEARCH_WITH_ELASTIC_TYPEHEAD = `${BASE_URL_WITH_ELASTIC}search/bank/_doc?q=`;

export const SEARCH_TYPEHEAD_WITH_LOCAL = `${BASE_URL_WITH_ELASTIC}search-typehead/`;
export const GET_RESULT_FOR_SELECTED_TEXT_WITH_LOCAL = `${BASE_URL_WITH_ELASTIC}selected-query/`; 
export const GET_CASE_DETAIL_WITH_LOCAL = `${BASE_URL_WITH_ELASTIC}case/`;

// CAN BE POST API 
export const GET_DETAIL_SEARCH_FORM_WITH_LOCAL = `${BASE_URL_WITH_ELASTIC}by-query`; 
//selected-query/ram/freetext

 
/**
 * @type POST
 * @description it will filter results from form filter 
 * @param { 
    "query":"ram",
    "type": "freetext",
     "bench":"",
    "year":"2004",
     "court" : "1",
    "sortBy": "1",
    "pageNumber":1 
}}
 */
export const GET_RESULT_FOR_SELECTED_TEXT_WITH_LOCAL_FILTER_FORM = `${BASE_URL_WITH_ELASTIC}by-selected-query`; 

export const GET_COURT_LIST = `${BASE_URL_WITH_ELASTIC}courts`; 
export const GET_BENCH_LIST = `${BASE_URL_WITH_ELASTIC}benchs`; 
 