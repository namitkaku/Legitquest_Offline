import React from "react";
import { connect } from "react-redux";
import { getResultForSelectedText, setFilterList } from "../redux/components/search/searchActions";

function FilterListTag({
  setFilterList$,
  filterList, 
  filterValueList,
  searchedQuery,
  sortBy,
  searchType,
  getResultForSelectedText$
}) {
  const onRemove = (item) => {
    console.log("item",item);
    setFilterList$({ filterValueList: item, adding: false });    
    
    const tmpFil =[...filterList].filter(item_ => item_!=item )
     getResultForSelectedText$({query:searchedQuery, filterList:tmpFil,sortBy,searchType})  
  };

  const RenderTags = ({ item }) => {
    return (
      <div
        style={{ cursor: "pointer" }}
        className="filter-item d-inline-flex align-items-center mr-2">
        <span>{item}</span>
        <a onClick={() => onRemove(item)} className="remove-selected">
          ×
        </a>
      </div>
    );
  }; 
  return (
    <div className="border-bottom">
      <div className=" px-4 py-3">
        {filterList?.map((item, key) => {
          return <RenderTags key={key} item={item} />;
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  filterList: state.search.filterList,
  filterValueList: state.search.filterValueList,
  searchedQuery: state.appState.searchedQuery,
  sortBy: state.appState.sortBy,
  searchType: state.appState.searchType,
});
const mapDispatchToProps = {
  setFilterList$: setFilterList,
  getResultForSelectedText$:getResultForSelectedText
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterListTag);
