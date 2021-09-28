import React, { useState } from "react";
import { connect } from "react-redux";
import { setMultiFilterSelectedRedux } from "../redux/components/app-state/appStateAction";
import {    toogleActTypeFilter } from "../redux/components/sc-material";
function ByActType({
  label,
  onApplyFilter,
  list,
  setMultiFilterSelectedRedux$,
  multiFilterSelected,
  currentFilterValues,
  toogleBenchFilter$,
}) {  
 
  const isSelectedTab = () => {
    return multiFilterSelected?.includes(label);
  };

   
  const isChecked = (toCheck) => {   
     return currentFilterValues?.includes(toCheck?.toString()); 
  };
  return (
    <div id="idraf" className="form-group mb-0">
      <label
        onClick={() =>
          setMultiFilterSelectedRedux$ && setMultiFilterSelectedRedux$(label)
        }
        className={
          isSelectedTab()
            ? "mb-2 text-muted d-flex align-items-center"
            : "mb-2 text-muted d-flex align-items-center collapsed"
        }
        data-toggle="collapse"
        data-target="#idraf-filter">
        <div className="arrow-triangle mr-2" /> By {label}
      </label>
      <ul
        className={
          isSelectedTab()
            ? "filter-list mb-0 collapse list-unstyled show "
            : "filter-list mb-0 collapse list-unstyled"
        }
        id="idraf-filter">
        <li className="mb-1 pl-2">
          {isSelectedTab() &&
            list?.map((item, key) => {
              const { Type, CaseCount } = item;
              return (
                <div key={key} className="custom-radio">
                  <label className="f-14 font-weight-normal d-flex">
                    <input
                      onChange={async () => {   
                       await  setMultiFilterSelectedRedux$(label)
                       await toogleBenchFilter$(CaseCount?.toString()); 
                       await onApplyFilter(  { newFilter:{ TitleArray: `${CaseCount?.toString()},` }, tabToOpen:label  });
                      
                        
                      }}
                      className="d-none"
                      type="radio"
                      name={`radio_amusoftech_${label}`}
                      defaultChecked={isChecked(CaseCount?.toString())}
                    />
                    <span> {Type}</span>
                    <small className="ml-auto text-primary font-weight-bold">
                      {CaseCount}
                    </small>
                  </label>
                </div>
              );
            })}
        </li>
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  multiFilterSelected: state.appState.multiFilterSelected,
  currentFilterValues: [...state.filter.ActTypeArray],
});

const mapDispatchToProps = {
  setMultiFilterSelectedRedux$: setMultiFilterSelectedRedux,
  toogleBenchFilter$: toogleActTypeFilter,
};
export default connect(mapStateToProps, mapDispatchToProps)(ByActType);
