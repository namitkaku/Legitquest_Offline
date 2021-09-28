import React, { useRef } from "react";
import { connect } from "react-redux";
import {
  getResultForSelectedText,
  searchWithFilters,
  setFilterList,
  setSelectedIdraf,
} from "../redux/components/search/searchActions";
import {
  setActiveCourt,
  setActiveFilters,
  setMultiFilterSelectedRedux,
  toggleIdraf,
} from "../redux/components/app-state/appStateAction";
import ByBench from "../components/ByBench";
import LeftFilterCard from "./LeftFilterCard";
import { lowerCaseFirstLetter } from "Utils/common";
import IdrafListComp from "./IdrafListComp";
import ByYear from "./ByYear";
import ByDecStatus from "./ByDecStatus";
import ByTitle from "./ByTitle";
import ByActType from "./ByActType";
function SearchFilterLeft(props) {
  const {
    filterList,
    setFilterList$, 
    searchedQuery,
    getResultForSelectedText$,
    sortBy,
    searchType,
    sideFiltersList,
    searchWithFilters$,
    CourtList,
    setActiveFilters$,
    activeFilters, 
    setActiveCourt$,
    filtredCourtName,
    IdrafList,
    toggleIdraf$,
    IdrafListOpen,
    setSelectedIdraf$,
    IdrafSelected, 
    currentFiltersNonSecMat,
    setMultiFilterSelectedRedux$
  } = props;
  //console.log({ activeFilters });
  const _form = useRef();
  const onFilterListSubmit = (e) => {
    e.preventDefault();
    setFilterList$({
      filterValueList: e.target.filterField.value,
      adding: true,
    });

    getResultForSelectedText$({
      query: searchedQuery,
      filterList: [...filterList, e.target.filterField.value],
      sortBy,
      searchType,
    });
    e.target.reset();
  };

  const onSearchButton = () => {
    const query = document.getElementById("filterField").value;
    setFilterList$({
      filterValueList: query,
      adding: true,
    });
    getResultForSelectedText$({
      query: searchedQuery,
      filterList: [...filterList, query],
      sortBy,
      searchType,
    });
    _form?.current?.reset();
  };
  const getKeyForFilter = (flag) => {
    switch (flag) {
      case "YearList":
        return ["Yeararray", 1];
      case "BenchList":
        return ["BenchArray", 0];
      case "DecStatusList":
        return ["Decisionarray", 2];

      default:
        return "none";
    }
  };
  const filterHelper = (keyData) => {
    setActiveFilters$({ ...activeFilters, ...keyData });
  };
  //console.log("activeFilters", activeFilters);
  const getCurrentActiveUsableFilters = () => {
    let tempActiveFilters = [];
    Object.keys(activeFilters)?.map((item, key) => {
      if (getKeyForFilter(item) != "none")
        tempActiveFilters = {
          ...tempActiveFilters,
          [getKeyForFilter(item)[0]]: activeFilters?.[item],
        };
    });
    return { ...tempActiveFilters, ...activeFilters };
  };
  const onSelect = (e) => {
    const { item, itemFileter } = e;
    const filterArrayKey = Object.keys(item)[0];
    const keyData = getKeyForFilter(filterArrayKey);
    const filterArrayValue = itemFileter[Object.keys(itemFileter)[keyData[1]]];
    //SETTING NEW FILTER
    filterHelper({ [filterArrayKey]: `${filterArrayValue.toString()},` });
    let tempActiveFilters = getCurrentActiveUsableFilters();
    const data = {
      query: searchedQuery,
      //filterList,
      sortBy,
      searchType,
      filterData: {
        ...tempActiveFilters,
        [keyData[0]]: `${filterArrayValue.toString()},`,
        SelectedFilter: lowerCaseFirstLetter(keyData[0]),
        FilterValueList: filterList ? filterList.join(",") : "",
      },
     
    };
    searchWithFilters$(data);
  };

  const onSelectSubSubCourt = (courtData) => {
    const { SubCourtCaseIds } = courtData;
    let tempActiveFilters = getCurrentActiveUsableFilters();
    const previousCourt = `${tempActiveFilters?.Courtarray}`;
    filterHelper({
      Courtarray: `${previousCourt}${courtData?.courtData?.SubCourtName?.toString()},`,
    });
    const data = {
      query: searchedQuery, 
      sortBy,
      searchType,
      filterData: {
        ...tempActiveFilters,
        ...currentFiltersNonSecMat,
        Courtarray: `${previousCourt}${courtData?.courtData?.SubCourtName?.toString()},`,
        SelectedFilter: "courtfilter",
        PageNo: 1,
        FilterValueList: filterList ? filterList.join(",") : "",
      },
    };
    searchWithFilters$(data);
    //  console.log("activeFilters",activeFilters, "data",data, "courtData", courtData ,"activeFilters",activeFilters,"previousCourt",previousCourt);
  };
  const onSelectSubCourt = (courtData) => {
    const { SubCourtCaseIds } = courtData;
    let tempActiveFilters = getCurrentActiveUsableFilters();
    const previousCourt = `${tempActiveFilters?.Courtarray}`;

    filterHelper({
      Courtarray: `${previousCourt}${courtData?.courtData?.SubCourtName?.toString()},`,
    });
    const data = {
      query: searchedQuery,
      sortBy,
      searchType,
      filterData: {
        ...tempActiveFilters,
        ...currentFiltersNonSecMat,
        Courtarray: `${previousCourt}${courtData?.courtData?.SubCourtName?.toString()},`,
        SelectedFilter: "courtfilter",
        PageNo: 1,
        FilterValueList: filterList ? filterList.join(",") : "",
      },
    };
    searchWithFilters$(data);
    //console.log("courtData", courtData ,"activeFilters",activeFilters);
  };

  const onSelectCourt = (courtData) => {

     
    const { CaseIds, radioName } = courtData;
     const data = {
      query: searchedQuery,
      sortBy,
      searchType,
      filterData: { 
        ...activeFilters, 
        ...currentFiltersNonSecMat,
        Courtarray: `${CaseIds?.toString()},`,
        SelectedFilter: "courtfilter",
        PageNo: 1,
        FilterValueList: filterList ? filterList.join(",") : "",
      },
      tabToOpen:"Court",
      callBack: opener 
    }; 

    filterHelper({ Courtarray: `${CaseIds?.toString()},` });
    setActiveCourt$(courtData?.CourtName);
    /* const { CaseIds, radioName } = courtData;
    filterHelper({ Courtarray: `${CaseIds?.toString()},` });
    setActiveCourt$(courtData?.CourtName);
    let tempActiveFilters = getCurrentActiveUsableFilters();
    const data = {
      query: searchedQuery, 
      sortBy,
      searchType,
      filterData: { 
        ...tempActiveFilters,
        Courtarray: `${CaseIds?.toString()},`,
        SelectedFilter: "courtfilter",
        PageNo: 1,
        FilterValueList: filterList ? filterList.join(",") : "",
      },
    }; */
    searchWithFilters$(data); 


    
  };

  const clearFilters = () => {
    getResultForSelectedText$({
      query: searchedQuery,
      filterList,
      sortBy,
      searchType,
    });
  };
  //console.log("IdrafList",IdrafList);
  const onSelectIDraf = (item) => {
    setSelectedIdraf$(item);
    //filterHelper({ Idrafarray: `${item},` });
    let tempActiveFilters = getCurrentActiveUsableFilters();
    const data = {
      query: searchedQuery,
      sortBy,
      searchType,
      filterData: { 
        ...tempActiveFilters,
        ...currentFiltersNonSecMat,
        Idrafarray: `${item},`,
        SelectedFilter: "idraffilter",
        PageNo: 1,
        FilterValueList: filterList ? filterList.join(",") : "",
      },
    }; 
    searchWithFilters$(data);
  };


  const opener = (tabLabel)=>{
    /// open 
  
    setMultiFilterSelectedRedux$( tabLabel)

  }

  const onApplyFilter=(item)=>{ 
    const {newFilter,tabToOpen} =item

     const data = {
      query: searchedQuery,
      sortBy,
      searchType,
      filterData: { 
        ...activeFilters, 
        ...currentFiltersNonSecMat,
        ...newFilter,
        PageNo: 1,
        FilterValueList: filterList ? filterList.join(",") : "",
      },
      tabToOpen,
      callBack: opener 
    }; 
 
    searchWithFilters$(data);  
  }




//  console.log("sideFiltersList", sideFiltersList.BenchList);
  return (
    <aside className="order-lg-1 bg-gray filter-sidebar" style={{ pointerEvents: 'none' , opacity: 0.3  }}>
      <section
        className="widget bg-gray  rounded-lg h-100 p-0"
        style={{ backgroundColor: "#fff" }}>
        <div className="d-flex align-items-center px-4 filter-head">
          <h2 className="widget-title mb-0 text-uppercase">
            <i className="fas fa-filter mr-1" /> Search Filter
          </h2>
          <a
            onClick={clearFilters}
            style={{ color: "#3646eb", cursor: "pointer" }}
            className="ml-auto">
            <i className="fa fa-undo f-12" aria-hidden="true" /> Clear
          </a>
        </div>
        <hr className="mt-0" />
        <form ref={_form} onSubmit={onFilterListSubmit}>
          <div className="filter-within-search d-flex align-items-center bg-light2 px-3 mb-3 py-1 mx-4">
            <a
              onClick={onSearchButton}
              className="btn btn-search-toggle btn-icon color--text">
              <i className="fas fa-search" />
            </a>
            <input
              name="filterField"
              id="filterField"
              className="form-control border-0 p-0 bg-transparent h-auto py-2 px-2"
              type="text"
              placeholder="Filter Within Result"
              required
            />
            <button
              onClick={(e) => {
                _form?.current?.reset();
              }}
              type="button"
              className="btn btn-sm btn-link h-auto p-0">
              <i className="lni lni-cross-circle" />
            </button>
          </div>
        </form>
        <div className="slimScroll px-4">
          <LeftFilterCard
            sideFiltersList={sideFiltersList || []}
            onSelect={onSelect}
            CourtList={CourtList}
            onSelectCourt={onSelectCourt}
            onSelectSubCourt={onSelectSubCourt}
            onSelectSubSubCourt={onSelectSubSubCourt}
            filtredCourtName={filtredCourtName}
          />

          
          {sideFiltersList?.map((filterItem, key) => {
            if (filterItem?.BenchList)
              return (
                <ByBench 
                  key={key}
                  list={filterItem?.BenchList}
                  label={"Bench"}
                  onApplyFilter={onApplyFilter}
                   
                />
              );  
              if (filterItem?.YearList)
              return (
                <ByYear 
                  key={key}
                  list={filterItem?.YearList}
                  label={"Year"}
                  onApplyFilter={onApplyFilter}
                />
              );  
              if (filterItem?.DecStatusList)
              return (
                <ByDecStatus 
                  key={key}
                  list={filterItem?.DecStatusList}
                  label={"Disposition"}
                  onApplyFilter={onApplyFilter}
                />
              );  

              if (filterItem?.TitleList)
              return (
                <ByTitle 
                  key={key}
                  list={filterItem?.TitleList}
                  label={"Title"}
                  onApplyFilter={onApplyFilter}
                />
              );  

              if (filterItem?.ActTypeList)
              return (
                <ByActType 
                  key={key}
                  list={filterItem?.ActTypeList}
                  label={"Act Type"}
                  onApplyFilter={onApplyFilter}
                />
              );  

                
            return null;
          })}


{IdrafList?.length > 0 && (
            <IdrafListComp
              toggleIdraf={toggleIdraf$}
              IdrafListOpen={IdrafListOpen}
              list={IdrafList}
              onSelectIDraf={onSelectIDraf}
              IdrafSelected={IdrafSelected}
            />
          )}

          <hr />
          {/* <div className="filter-graph mt-4">
            <img
              src={require("../../assets/images/graph.png").default}
              alt=""
              className="img-fluid"
            />
          </div> */}
        </div>
      </section>
      {/* Widget Section */}
    </aside>
  );
}

const mapStateToProps = (state) => ({
  searchResults: state.search.searchResultsForSelectedText,
  filterValueList: state.search.filterValueList,
  filterList: state.search.filterList,
  searchedQuery: state.search.queryToSearch,
  sortBy: state.search.sortBy,
  searchType: state.appState.searchType,
  activeFilters: state.appState.activeFilters,
  sideFiltersList: state.search.sideFiltersList,
  CourtList: state.search.CourtList,
  IdrafList: state.search.IdrafList,
  currentPage: state.search.currentPage,
  filtredCourtName: state.appState.filtredCourtName,
  IdrafListOpen: state.appState.IdrafListOpen,
  IdrafSelected: state.search.IdrafSelected,
  multiFilterSelected: state.appState.multiFilterSelected,
  currentFiltersNonSecMat: { /// filtrs for non secondry material
    BenchArray: state.filter.BenchArray?.toString() ,
    Idrafarray: state.filter.Idrafarray?.toString() ,
    Yeararray: state.filter.Yeararray?.toString() ,
    Decisionarray: state.filter.Decisionarray?.toString()  
  },
   
});

const mapDispatchToProps = {
  setFilterList$: setFilterList,
  getResultForSelectedText$: getResultForSelectedText,
  searchWithFilters$: searchWithFilters,
  setActiveFilters$: setActiveFilters,
  setActiveCourt$: setActiveCourt,
  toggleIdraf$: toggleIdraf,
  setSelectedIdraf$: setSelectedIdraf,
  setMultiFilterSelectedRedux$: setMultiFilterSelectedRedux,
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchFilterLeft);
