import React, { useState } from "react";
import MainLayout from "Layout/MainLayout";
import SearchWithFilters from "../../components/SearchWithFilters";
import ReduxWrapper from "../../utils/ReduxWrapper";
import TopFilter from "../../components/TopFilter";
import { useAlert } from "react-alert";
import {Link} from 'react-router-dom';
 
function SearchForm(props) {
  const {
    setSelectedYear$,
    setSelectedState$,
    setSelectedBench$,
    setSelectedCourt$,
    getCourts$,
    getBenchs$,
    history,
    getDataForFilterForm$,
    appState: {
      searchedQuery,
      selectedState,
      selectedYear,
      searchType,
      searchQueryWithFilters,
      selectedCourt,
      selectedBench
    },
    search: { sortBy },
    getResultForSelectedTextWithFilterForm$,
    searchTypeHead$,
    queryToSearch$
  } = props;
  const [bench, setBench] = useState();
  const [court, setCourt] = useState();
  const [state, setState] = useState();
  const [year, setYear] = useState({});
  const alert = useAlert();
  const onReset = () => {
    ["input_query", "input_court", "input_bench", "input_year"]?.map((item) => {
      document.getElementById(item).value = null;
    });
    setFromQuery({});
  };

  const [fromQuery, setFromQuery] = useState();

  const getQueryToSearch = ()=>{
    if(fromQuery)
    return fromQuery
    if(searchedQuery)
    return searchedQuery
  }
  const onSubmit = (e) => {
    e.preventDefault();

    if (getQueryToSearch()) {
      getResultForSelectedTextWithFilterForm$({
        query: getQueryToSearch(),
        state: selectedState,
        //bench,
        year: selectedYear,
        //court,
        type: searchType,
        sortBy,
        court,
        bench
      });
      history?.push("/home");
    }else{
      alert.show("Please enter query to search");
    }
  };

  const onChange = (e) => {
    setFromQuery(e.target.value);
    if (e.target.value?.length > 2)
      getCourts$({
        query: e.target.value,
        state: selectedState,
        year: selectedYear,
        searchType
      });
  }; 
  const resetCourtAndBench = () => {
    setCourt(null);
    setBench(null);
    setSelectedBench$(null) 
    setSelectedCourt$(null) 
  };
  const onCourtChange = (e) => {
    const value = e.target.value;
    setCourt(value);
    setSelectedCourt$(value);
    getBenchs$({
      query: fromQuery,
      state: selectedState,
      year: selectedYear,
      searchType,
      courtId: value
    });
    //resetCourtAndBench()
  };

  const onStateChange = (e) => {
    const value = e.target.value;
    setState(value);
    setSelectedState$(value);
    resetCourtAndBench()
    /* if (value != "Select Court") {
      setCourt(value);
      e?.target?.value &&
        getBenchs$({ query: fromQuery, courtId: e.target.value, searchType });
    } */
  };
  const onBenchChange = (e) => {
    const value = e.target.value;
    if (value != "Select Bench") {
      setBench(value);
      setSelectedBench$(value);
    }
  };
  const onYearChange = (e) => {
    //setYear({ ...year, ...e });
    const value = e.target.value;
    setYear(value);
    setSelectedYear$(value);
    resetCourtAndBench();
  };

  return (
    <MainLayout history={history}>
      <div className="row mt-3">
        <div className="col-md-12">
          <Link to='/act-list'>
            Acts List
          </Link>
          <button
            onClick={onReset}
            name="reset"
            className={`btn btn-danger float-right mr-5 mt-2`}>
            Reset Search
          </button>
        </div>
      </div>

      <div
        className="row mr-5 ml-5 mt-2 mb-3 "
        style={{ width: "70%", paddingLeft: "15%" }}>
        <div className="mb-3">
          <label htmlFor="search_type" className="form-label">
            Search Type
          </label>
          <TopFilter />
        </div>

        {/* <div className="col-auto">
          <label className="sr-only" for="inlineFormInputGroup">
            Username
          </label>
          <div className="input-group mb-2">
            
            <input
              type="text"
              className="form-control"
              id="inlineFormInputGroup"
              placeholder="Username"
            />
            <div className="input-group-prepend">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div> */}

        <SearchWithFilters
          history={history}
          searchType={searchType}
          onSubmit={onSubmit}
          searchQueryWithFilters={searchQueryWithFilters}
          onChange={onChange}
          onStateChange={onStateChange}
          onBenchChange={onBenchChange}
          onYearChange={onYearChange}
          year={year}
          onCourtChange={onCourtChange}
        />
      </div>
    </MainLayout>
  );
}

export default ReduxWrapper(SearchForm);
