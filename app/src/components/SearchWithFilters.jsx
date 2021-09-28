import React, { useState, useRef } from "react";
import { getPlacheHolder } from "../utils/common";
import ReduxWrapper from "../utils/ReduxWrapper";
import TopFilter from "./TopFilter";
import YearPicker from "react-single-year-picker";
import { AVILABLE_YEARS,INDIAN_STATES } from "../utils/appConst";
 
function SearchWithFilters({
  onChange,
  searchType,
  onSubmit,
  searchQueryWithFilters,
  onStateChange,
  onYearChange,
  onBenchChange,
  onCourtChange,
  year,
  appState: { selectedBench, selectedCourt,selectedState , selectedYear ,courtList, benchList ,searchedQuery }
}) {
  let formRef = useRef();
  const { yearList } = searchQueryWithFilters || {};
 const SHOW_ACT_IF ="act-section"
  
 const _renderSection = () => {
  return (
    <div className={  "col-sm-6"  }>
      <div className="form-group">
        <label htmlFor="email">Section</label>
        <input
          onChange={onChange}
          type="text"
          className="form-control"
          id="input_section"
          name={"section"}
          required
          placeholder={"Section..."}
        />
      </div>
    </div>
  );
};
  const _renderInput = () => {
    return (
      <div className={SHOW_ACT_IF ===searchType ? "col-sm-6" :"col-sm-12"}>
        <div className="form-group">
          <label htmlFor="email">Query</label>
          <input
            onChange={onChange}
            type="text"
            className="form-control"
            id="input_query"
            name={"query"}
            defaultValue={searchedQuery}
            required
            placeholder={getPlacheHolder(searchType)}
          />
        </div>
      </div>
    );
  };
  return (
    <form
      id="search-form"
      ref={formRef}
      className="search-form-with-filters"
      onSubmit={onSubmit}>
      <div className="row">
        <hr className="my-lg-4 my-xl-5" />
        <div className="col-sm-12">
          <div className="form-group">
            <label htmlFor="court">State</label>
            <select
               onChange={onStateChange}
              name="court"
              id="input_court"
              className="form-select form-control"
              aria-label="Default select example">
              <option  >Select Court</option>
              {INDIAN_STATES?.map((court, key) => {
                const {  code,label } = court;
                return (
                  <option selected={selectedState===code  } key={key} value={code}>
                    {label}
                  </option>
                );
              })}
            </select>
          </div>
        </div>


        <div className="col-sm-12">
          <div className="form-group">
            <label htmlFor="court">Year</label>
            <select
               onChange={onYearChange}
              name="court"
              id="input_court"
              className="form-select form-control"
              aria-label="Default select example">
              <option selected>Select Year</option>
              {AVILABLE_YEARS?.map((year, key) => { 
                return (
                  <option selected={selectedYear ==year} key={key} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {_renderInput()}
        {SHOW_ACT_IF ===searchType &&_renderSection()}

 
         <div className="col-sm-12">
          <div className="form-group">
            <label htmlFor="court">Court</label>
            <select
              onChange={onCourtChange}
              name="court"
              id="input_court"
              className="form-select form-control"
              aria-label="Default select example">
              <option selected>Select Court</option>
              {courtList?.map((court, key) => {
                const { CourtId, Name } = court;
                return (
                  <option selected={selectedCourt ==CourtId} key={key} value={CourtId}>
                    {Name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>  
         
           <div className="col-sm-12">
            <div className="form-group">
              <label htmlFor="court">Bench</label>
              <select
                onChange={onBenchChange}
                name="bench"
                id="input_bench"
                className="form-select form-control"
                aria-label="Default select example">
                <option selected>Select Bench</option>
                {benchList?.map((bench, key) => {
                  const { NoOfJudges } = bench;
                  return (
                    <option selected={selectedBench ==NoOfJudges} key={key} value={NoOfJudges}>
                      {NoOfJudges}
                    </option>
                  );
                })}
              </select>
            </div>
          </div> 
          
        {/* <div className="col-sm-12">
          <div className="form-group">
             
            <div className="row">
              <div className="col-md-2">
                <label htmlFor="year">From</label>
                <YearPicker
                  yearArray={["2019", "2020"]}
                  onSelect={(e) => onYearChange && onYearChange({ From: e })}
                  rightIcon={""}
                  minRange={1000}
                  maxRange={2021}
                  value={year.From}
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="year">To</label>
                <YearPicker
                  yearArray={["2019", "2020"]}
                  onSelect={(e) => onYearChange && onYearChange({ To: e })}
                  minRange={year.From ? year.From : 1000}
                  maxRange={2021}
                  value={year.To}
                />
              </div>
            </div>
          </div>
        </div> */}

        <div className="col-sm-12 mb-2">
          <div className="row">
            
            <div className="col-md-12">
              <button
                type="submit"
                name="submit"
                className={`btn btn-primary   w-100`}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
export default ReduxWrapper(SearchWithFilters);
