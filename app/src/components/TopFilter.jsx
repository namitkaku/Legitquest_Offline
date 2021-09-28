import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  toggleLeftMenu,
  toggleTopFilter,
  setSearchType,
} from "../redux/components/app-state/appStateAction";
const filters = [
  {
    leftLabel: "Free text search",
    title: "Free text Search with advance search options",
    defaultValue: "free-text-box",
    spanLabel: "All",
    datavalue: "Free text Search with advance search options",
    type: "freetext",
  },
  {
    leftLabel: "Name-Year-Vol-Page",
    title: "Search through Alternate Citations",
    defaultValue: "citation-box",
    spanLabel: "Citation",
    datavalue: "Search through Alternate Citations",
    type: "citation",
  },

  {
    leftLabel: "Last name – first name",
    title: "Search through First/Last name of the judge",
    defaultValue: "judge-box",
    spanLabel: "Judge Name",
    datavalue: "Search through First/Last name of the judge",
    type: "bench",
  },
  {
    leftLabel: "Petitioner - respondent",
    title: "Search through First/Last name of the Party",
    defaultValue: "party-box",
    spanLabel: "Party Name",
    datavalue: "Search through First/Last name of the Party",
    type: "partyname",
  }/* ,
  {
    leftLabel: "Act name- Section",
    title: "Search through Act name and then put the section/Article",
    defaultValue: "act-box",
    spanLabel: "Act Name",
    datavalue: "Search through Act name and then put the section/Article",
    type: "act-section",
  }, */
];
function TopFilter(props) {
  const {
    toggleTopFilter$,
    topFilterVisiable,
    leftMenuOpen,
    toggleLeftMenu$,
    setSelectedTopFilter$,
    searchType,
  } = props;
  const [selectedTypeOfSearch, setSelectedTypeOfSearch] = useState("");
  const selectFilter = (filterValue) => {
    setSelectedTopFilter$(filterValue);
    toggleTopFilter$(!topFilterVisiable);
  };

  useEffect(() => {
    getSelectedSearchTypeToReadable();
  }, [searchType]);
  const getSelectedSearchTypeToReadable = () => {
    if (searchType) {
      filters?.map((item) => {
        const { type, spanLabel } = item;
        if (type === searchType) {
          setSelectedTypeOfSearch(spanLabel);
        }
      });
    } else {
      setSelectedTypeOfSearch("ALL");
    }
  };
  return (
    <div className="search-select">
      <button
        onClick={(e) => {e.preventDefault()
           toggleTopFilter$(!topFilterVisiable)}}
        className="btn btn-primary select-btn_REMOVED px-3 dropdown-toggle "
        data-toggle="collapse"
        href="#select-dropdown" 
        aria-expanded="false"
        aria-controls="select-dropdown">
        {selectedTypeOfSearch}
      </button>
      <div
        className={topFilterVisiable ? "collapse show " : "collapse "}
        id="select-dropdown">
        <div className="card card-body p-3">
          <div className="select-block mb-4">
            <strong className="d-block mb-2">Case Law</strong>
            <ul className="m-0 p-0 list-unstyled">
              {filters?.map((item, index) => {
                const {
                  type,
                  leftLabel,
                  title,
                  defaultValue,
                  spanLabel,
                  datavalue,
                } = item;
                return (
                  <li key={index} className="mb-1">
                    <div className="select-radio">
                      <div className="select-radio-inner">
                        <span>{leftLabel}</span>
                        <label
                          className="mb-0"
                          data-toggle="tooltip"
                          data-placement="left"
                          title={title}>
                          <input
                            className="d-none"
                            type="radio"
                            name="search-radio"
                            defaultValue={defaultValue}
                            data-value={datavalue}
                            defaultChecked={searchType === type}
                          />
                          <span
                            style={{
                              fontWeight:
                                searchType === type ? "bold" : "normal",
                            }}
                            onClick={() => selectFilter(type)}>
                            {spanLabel}
                          </span>
                        </label>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        
        </div>
      </div>
      {/*   enable later
       <div className="search-tooltip shadow">
          <h5>All</h5>
          <span>Free text Search with advance search options</span>
          <a href="#" className="close-tooltip">
            <img  src={require("../../../assets/images/Close.svg").default}  alt="" className width={15} />
          </a>
        </div> */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  leftMenuOpen: state.appState.leftMenuOpen,
  topFilterVisiable: state.appState.topFilterVisiable,
  searchType: state.appState.searchType,
});
const mapDispatchToProps = {
  toggleLeftMenu$: toggleLeftMenu,
  toggleTopFilter$: toggleTopFilter,
  setSelectedTopFilter$: setSearchType,
};
export default connect(mapStateToProps, mapDispatchToProps)(TopFilter);
