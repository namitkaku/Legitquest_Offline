import React from "react";
import ContentContainer from "Components/ContentContainer";
import MainLayout from "Layout/MainLayout";
import { connect } from "react-redux";
import {
  getResultForSelectedText,
  getResultForSelectedTextWithFilterForm,
  searchWithFilters,
  setSortBy,
} from "../../redux/components/search/searchActions";
import { getCurrentActiveUsableFilters } from "../../utils/common";
import { getFilterKey } from "../../utils/common";
import { toogleScMaterial } from "../../redux/components/sc-material";
import SearchWithFilters from "../../components/SearchWithFilters";
 
function Home({
  getResultForSelectedTextWithFilterForm$,
  selectedState ,
  selectedYear ,
  selectedBench,
  selectedCourt,
  activeFilters,
  filterList,
  sortBy,
  searchType,
  getResultForSelectedText$,
  setSortBy$,
  caseResultsCount,
  searchedQuery,
  searchResults,
  isLoading,
  searchWithFilters$,
  numberOfPages,
  history,
  secondrayMaterial,
  toogleScMaterial$,
  currentFiltersNonSecMat
}) { 
 //console.log("secondrayMaterial",secondrayMaterial);
  const onSoryBy = (e) => {
    const newSortVal= e?.target?.value
    setSortBy$(newSortVal);

    if (Object.keys(activeFilters).length > 0) {
      let tmpf = {};
      Object.keys(activeFilters)?.map((item) => {
        tmpf = { ...tmpf, [getFilterKey(item)]: activeFilters?.[item] };
      });
      const data = {
        query: searchedQuery,
        sortBy: newSortVal,
        searchType,
        filterData: {
          /* ...activeFilters */ ...tmpf,
          ...currentFiltersNonSecMat,
          FilterValueList: filterList ? filterList.join(",") : "",
        },
      };

     /// console.log("activeFilters",activeFilters,">>>>",getCurrentActiveUsableFilters(activeFilters));
      searchWithFilters$(data);
    } else {
      getResultForSelectedTextWithFilterForm$({
        state: selectedState, 
        year:selectedYear,
        bench:  selectedBench,
        court: selectedCourt,
        secondrayMaterial,
        doNotClearFilter: true,
        filterList,
        type:searchType,
        query: searchedQuery,
        sortBy: e?.target?.value,
      });
    }
  };
 
  return (
    <>
      <MainLayout history={history}> 
       {/*  <SearchWithFilters />   */}
        <ContentContainer 
          filterList={filterList}
          sortBy={sortBy}
          onSoryBy={onSoryBy}
          caseResultsCount={caseResultsCount}
          searchedQuery={searchedQuery}
          searchResults={searchResults}
          numberOfPages={numberOfPages}
          secondrayMaterial={secondrayMaterial}
          toogleScMaterial={({value})=>{
            getResultForSelectedText$({
              secondrayMaterial:value,
              doNotClearFilter: false,
              filterList,
              searchType,
              query: searchedQuery,
              sortBy
            });
            toogleScMaterial$({value})
          }}
        />
         
      </MainLayout>
    </>
  );
}
const mapStateToProps = (state) => ({
  isLoading: state.appState.isLoading,
  searchedQuery: state.appState.searchedQuery,
  searchResults: state.search.searchResultsForSelectedText,
  caseResultsCount: state.search.caseResultsCount,
  searchType: state.appState.searchType,
  sortBy: state.search.sortBy,
  filterList: state.search.filterList,
  activeFilters: state.appState.activeFilters,
  numberOfPages: state.search.numberOfPages,
  secondrayMaterial :state.secMat.secondrayMaterial, 
  currentFiltersNonSecMat: { /// filtrs for non secondry material
    BenchArray: state.filter.BenchArray?.toString() ,
    Idrafarray: state.filter.Idrafarray?.toString() ,
    Yeararray: state.filter.Yeararray?.toString() ,
    Decisionarray: state.filter.Decisionarray?.toString()  
  },
  selectedState:state.appState.selectedState,
  selectedYear: state.appState.selectedYear,
  selectedCourt :state.appState.selectedCourt,
  selectedBench:state.appState.selectedBench
});
const mapDispatchToProps = {
  setSortBy$: setSortBy,
  getResultForSelectedText$: getResultForSelectedText,
  searchWithFilters$: searchWithFilters,
  toogleScMaterial$:toogleScMaterial,
  getResultForSelectedTextWithFilterForm$:getResultForSelectedTextWithFilterForm
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
  