import React, { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import "react-bootstrap-typeahead/css/Typeahead.css";
import { connect } from "react-redux";
import {
  getResultForSelectedText,
  searchTypeHead,
  queryToSearch,
  setTypeHeadResults,
} from "../redux/components/search/searchActions";
import { goToHomePage } from "../utils/common"; 
import { searchForTypeHead } from "../utils/DBUtil";
import search_head from '../../electron/search_head.json'
function SearchField({
  getResultForSelectedText$,
  searchResults,
  searchTypeHead$,
  queryToSearch$,
  placeholder,
  renderInput,
  searchType,
  sortBy,
  filterList,
  queryToSearchString,
  history,
  secondrayMaterial,
  setTypeHeadResults$
}) {
  const [open, setOpen] = useState();
  //console.log("searchResults",searchResults);
  //console.log({search_head});
/* useEffect(() => {
  searchResults?.length >0 && setOpen(true);
}, [searchResults]) */
  const getPlacheHolder = (searchType) => {
    switch (searchType) {
      case "act-section":
        return "Act Name";
      case "freetext":
        return "Search free text..";
      case "partyname":
        return "petitioner/respondent";
      case "bench":
        return "Judge Name";
      case "citation":
        return "Search through citation";
    }
  };
  const callBack= (searchResults)=>{
   //  console.log({searchResults});
    setTypeHeadResults$(searchResults)

  }
  const searWithJson =async  (query)=>{ 
    if(query?.length > 2){
     /* const results = await searchForTypeHead(query)
     setTypeHeadResults$( results)  */
    }
    /* api?.downloadApi.searchWithJson( query,"party", callBack); */
  }
  return (
    <Typeahead
      open={open}
      name="typehead"
      id={"search_type_head"}
      placeholder={   getPlacheHolder(searchType)}
      onChange={(selected) => {
        setOpen(false);
        getResultForSelectedText$({
          secondrayMaterial,
          query: selected[0]?.Value,
          searchType,
          filterList,
          sortBy,
        });
        queryToSearch$(selected[0]?.Value);
        goToHomePage(history);
        
      }}
      onInputChange={(query) => {
          setOpen(true); 
          query.length >= 3 &&  searchTypeHead$({ query, searchType});
         queryToSearch$(query);  
          //searWithJson(query)
        //api?.typeHeadApi.getResult(query, (  results)=>console.log("results", results) )
      }}
      onBlur={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      labelKey={(option) => `${option.Value}`}
      style={{ width: "98%" }}
      options={[...searchResults]}
      renderInput={renderInput}
      renderMenuItemChildren={(option, props, index) => {
        const { Value } = option;
        return <p key={index}>{Value}</p>;
      }}
      defaultInputValue={queryToSearchString ? queryToSearchString : ""}
      onKeyDown={(e) => {
        
        if (e.keyCode === 13 && e?.target?.value?.length >= 3) {
         

            setOpen(false);
          queryToSearch$(e?.target?.value);
          getResultForSelectedText$({
            secondrayMaterial,
            query: e?.target?.value,
            searchType,
            filterList,
            sortBy,
          });
          goToHomePage(history);  
        }
      }}
    />
  );
}

const mapStateToProps = (state) => ({
  searchResults: state.search.searchResults,
  searchType: state.appState.searchType,
  queryToSearchString: state.search.queryToSearch,
  sortBy: state.appState.sortBy,
  filterList: state.search.filterList,
  secondrayMaterial :state.secMat.secondrayMaterial, 
});
const mapDispatchToProps = {
  searchTypeHead$: searchTypeHead,
  getResultForSelectedText$: getResultForSelectedText,
  queryToSearch$: queryToSearch,
  setTypeHeadResults$:setTypeHeadResults
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchField);
 
//export default SearchField
