import React, { useState } from "react";
import { SEARCH_WITH_IN_CASE } from "../api/ApiList";
import ReactHtmlParser from "react-html-parser";
const iconsStyles = {
  color: "#3646eb",
  cursor: "pointer",
};

export default function SearchWithInCase({toggleModal, whichIsOpen, caseId }) {
  const [searcWithinCase, setSearcWithinCase] = useState(false);
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(false);
  const [currentActive, setCurrentActive] = useState(1);

  const fetchData = (e) => {
    e.preventDefault()
    setLoading(true);
    fetch(
      `${SEARCH_WITH_IN_CASE}caseId=${caseId}&searchText=${e.target?.searchField?.value}`
    )
      .then((respounce) => respounce.json())
      .then((result) => {
        setLoading(false);
        
        setSearchResult(result);
      });
  };

  const searchHighlightNext = () => {
    var nextSpanId = parseInt(currentActive) + 1;
    var prevElement = document.getElementById("span_" + currentActive);
    if (prevElement != null) {
      prevElement.style.backgroundColor = "#FFFF00";
      prevElement.style.color = "#000000";
    }
    var element = document.getElementById("span_" + nextSpanId);
    if (element != null) {
      element.style.backgroundColor = "#9A7D0A";
      element.style.color = "#FFFFFF";

      setCurrentActive(parseInt(currentActive) + 1);
    }
  };


  const searchHighlightPrev = () => {
    var nextSpanId = parseInt(currentActive) - 1;
    var prevElement = document.getElementById("span_" + currentActive);
    if (prevElement != null) {
      prevElement.style.backgroundColor = "#FFFF00";
      prevElement.style.color = "#000000";
    }
    var element = document.getElementById("span_" + nextSpanId);
    if (element != null) {
      element.style.backgroundColor = "#9A7D0A";
      element.style.color = "#FFFFFF";

      setCurrentActive(parseInt(currentActive) - 1);
    }
  };

  const _renderSearchWithInCase = () => {
    return (
      <div className="case-popup bg-white search-popup shadow-sm active">
        <div className="header-popup d-flex align-items-center justify-content-between px-3 py-2">
          <span className="text-dark ">
            <i className="fa fa-search" aria-hidden="true"></i>
            <span className="h6 mb-0 font-weight-bold">Search Within Case</span>
          </span>
          <a 
           style={iconsStyles}  
            onClick={() =>{ 
              toggleModal &&  toggleModal("") 
              /* setSearcWithinCase(searcWithinCase ? false : true) */
            }}
            className="popup-close">
            <i className="fa fa-times" aria-hidden="true"></i>
          </a>
        </div>

        <div className="popup-result popup-body p-3">
          <div className="case-search d-flex">
            <form
              onSubmit={fetchData}
              className="case-search d-flex"
              style={{ width: "100%" }}>
              <input
                type="text"
                autoFocus
                className="form-control form-control-sm"
                placeholder="Enter Keyword"
                name="searchField"
              />
              <button type="submit" className="btn btn-primary btn-sm h-auto w-auto ml-2">
                {!loading && <small>Search</small>}

                {loading && (
                  <div
                    className="spinner-border spinner-border-sm text-light"
                    role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </button>
            </form>
            <button  onClick={()=>searchHighlightPrev()} className="btn btn-primary  btn-sm  h-auto w-auto ml-2">
              <small>Previous</small>
            </button>
            <button
              onClick={() => searchHighlightNext()}
              className="btn btn-primary  btn-sm h-auto w-auto ml-2">
              <small>Next</small>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const _renderSearchWithIn = () => {
    return (
      <a
        style={iconsStyles}
        onClick={() => {
          //setSearcWithinCase(!searcWithinCase)
          toggleModal && toggleModal("SWC")
        }
        }
        className="popup-open search-link mr-3">
        <small>
          <i className="fa fa-search" aria-hidden="true" />
          Search Within Case
        </small>
      </a>
    );
  };

  const _renderInSearchJudgement = () => {
    return (
      <div style={{ padding: 10, backgroundColor: "#fff" }}> 
        {ReactHtmlParser(searchResult?.JudgmentText)}{" "}
      </div>
    );
  };
  //console.log("searcWithinCase && searchResult",searcWithinCase && searchResult);
  return (
    <>
      {_renderSearchWithIn()}
      {whichIsOpen==="SWC"/* searcWithinCase */ && _renderSearchWithInCase()}

      {/* searcWithinCase */whichIsOpen==="SWC" && searchResult && _renderInSearchJudgement()}
    </>
  );
}
