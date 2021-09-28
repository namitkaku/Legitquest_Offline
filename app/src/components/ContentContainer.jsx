import React, { useState } from "react";
import { confi } from "../utils/appConfig";
import { secMaterialList } from "../utils/appConst";
import FilterListTag from "./FilterListTag";
import Pagination from "./Pagination";
import SearchCard from "./SearchCard";
import SearchFilterLeft from "./SearchFilterLeft";
import SecMaterialComp from "./SecMaterialComp";

export default function ContentContainer({
  onSoryBy,
  caseResultsCount,
  searchedQuery,
  searchResults,
  sortBy,
  filterList,
  numberOfPages,
  toogleScMaterial,
  secondrayMaterial
}) {
    //console.log({searchResults});
  return (
    <section className="search-listing-section bg-gray py-0" id="case_list" >
      <div className="d-flex position-relative">
        <div className="posts__wrapper flex-fill  mb-5 mb-lg-0 order-lg-2">
          <div className="text-center filter-togle d-block d-lg-none">
            <a href="#0">
              <i className="fas fa-filter mr-1" />
              <span className="filter-text">Show Filter</span>
            </a>
          </div> 
         {filterList?.length > 0 && <FilterListTag />}
          <div className="reasult-header border-bottom   px-4  d-flex align-items-center justify-content-between">
            {searchedQuery && (
              <span>
                <strong>{caseResultsCount ? caseResultsCount : 0}</strong>{" "}
                results found for query {decodeURIComponent( searchedQuery)}
              </span>
            )}
                  <div id="resultStats">
              <span className="d-none d-md-inline-block">Sort by</span>
              <span className="text-muted"> </span>
              <select defaultValue={sortBy} className="sort-by" onChange={(e) => onSoryBy(e)}>
                {[
                  //{ value: 1, label: "Relevance" },
                  { value: 2, label: "Newest" },
                  { value: 3, label: "Oldest" },
                ].map((item, key) => {
                  const { value, label } = item;
                  return <option key={key}      value={value}>{label}</option>;
                })}
              </select>
            </div>       
          </div>
           {/* <SecMaterialComp toogleScMaterial={toogleScMaterial} secondrayMaterial={secondrayMaterial}/>  */}
          <div className="p-4 ">
            <div className="row no-gutters">
              {
                /* ["positive", "caution", "referred", "warning", "cited"] */
                searchResults?.CaseDetails?.map((item, key) => {
                  const {
                    Judges,
                    CourtName,
                    DateOfJudgment,
                    HighlightedText,
                    LinkText,
                    PartyName,
                    EncryptedId,
                    CaseId,
                    OtherStatusImgUrl,
                    SnapShot,
                    DistinguishedImgUrl
                  } = item;
                  //console.log("item",item);
                  return (
                    <SearchCard
                      key={key}
                      EncryptedId={EncryptedId}
                      Judges={Judges}
                      CourtName={CourtName}
                      DateOfJudgment={DateOfJudgment}
                      LinkText={LinkText}
                      PartyName={PartyName}
                      HighlightedText={HighlightedText}
                      CaseId={CaseId}
                      OtherStatusImgUrl={OtherStatusImgUrl ? OtherStatusImgUrl : DistinguishedImgUrl}
                      SnapShot={SnapShot}
                      secondrayMaterial={secondrayMaterial}
                    />
                  );
                })
              }
            </div>
            {/* inner nested row */}
           {numberOfPages > 5 &&  <Pagination />}
          </div>
        </div> 
        {/* END Posts Wrapper */}
        {confi.showLeftFilters &&<SearchFilterLeft />}
      </div>
    </section>
  );
}
 