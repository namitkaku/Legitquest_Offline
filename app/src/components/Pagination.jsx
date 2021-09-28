import React, { useState } from "react";
import { connect } from "react-redux";
import Pager from "react-js-pagination";
import {
  getResultForSelectedText,
  setPageNumber,
  onPageNumberChange,
  getResultForSelectedTextWithFilterForm
} from "../redux/components/search/searchActions";
import {getCurrentActiveUsableFilters} from 'Utils/common'
function Pagination({
  selectedState ,
  selectedYear ,
  selectedBench,
  selectedCourt,
  getResultForSelectedTextWithFilterForm$,
  setPageNumber$,
  currentPage,
  numberOfPages, 
  searchedQuery,
  searchType,
  sortBy,
  filterList,  
  onPageNumberChange$,
  activeFilters,
  getResultForSelectedText$,
  all
}) {
  //console.log("activeFilters",activeFilters);
  const handlePageChange = (pageNumber) => {
     const activeFilters_  =getCurrentActiveUsableFilters(activeFilters)
      
    if (pageNumber != currentPage) {


      setPageNumber$(pageNumber); 
       
       
      getResultForSelectedTextWithFilterForm$({ 
        state: selectedState, 
        year:selectedYear,
        query: searchedQuery,
        type:searchType,  
        sortBy, 
        pageNumber,
        doNotClearFilter:true,
        court: selectedBench,
        bench:selectedCourt
      })

      document
      ?.getElementById(`basics`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  
  return (
    <nav className="mt-4" aria-label="Page navigation">
      <Pager
        activePage={currentPage}
        itemsCountPerPage={10}
        itemsCountPerPage={5}
        totalItemsCount={Number( numberOfPages)}
         pageRangeDisplayed={5}
         
        innerClass={"pagination justify-content-center"}
        itemClass={"page-item"}
        linkClass={"page-link"}
        onChange={handlePageChange}
        firstPageText={"First"}
        lastPageText={"Last"}
        nextPageText={"Next"}
        prevPageText={"Previous"}
      />
    </nav>
  );
}

const mapStateToProps = (state) => ({
  currentPage: state.search.currentPage,
  numberOfPages: state.search.numberOfPages, 
  searchedQuery: state.appState.searchedQuery,
  searchType: state.appState.searchType,
  sortBy: state.search.sortBy,
  filterList: state.search.filterList,
  activeFilters: state.appState.activeFilters, 
  all:state,
  selectedState:state.appState.selectedState,
  selectedYear: state.appState.selectedYear,
  selectedCourt :state.appState.selectedCourt,
  selectedBench:state.appState.selectedBench
   
});
const mapDispatchToProps = {
  setPageNumber$: setPageNumber, 
  onPageNumberChange$:onPageNumberChange,
  getResultForSelectedText$: getResultForSelectedText,
  getResultForSelectedTextWithFilterForm$:getResultForSelectedTextWithFilterForm
};
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
