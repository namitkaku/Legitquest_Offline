import React, { useState } from "react";
import { connect } from "react-redux";
import { setMultiFilterSelectedRedux } from "../redux/components/app-state/appStateAction";
import { toogleBenchFilter, toogleYearFilter } from "../redux/components/sc-material";
function ByYear({
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
          {isSelectedTab()&& list?.map((item, key) => {
            const { CaseCount, DisplayYear } = item;
            return (
              <div key={key} className="custom-radio">
                <label className="f-14 font-weight-normal d-flex">
                  <input
                    onChange={async () => {  
                      await  setMultiFilterSelectedRedux$(label)
                      await toogleBenchFilter$(DisplayYear?.toString()); 
                      await onApplyFilter(  { newFilter:{ Yeararray: `${DisplayYear?.toString()},` }, tabToOpen:label  });
                    }}
                    className="d-none"
                    type="radio"
                    name={`radio_amusoftech_${label}`}
                    defaultChecked={[...currentFilterValues]?.includes( DisplayYear?.toString() )}
                  />
                  <span> {DisplayYear}</span>
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
  currentFilterValues: [...state.filter.Yeararray],
});

const mapDispatchToProps = {
  setMultiFilterSelectedRedux$: setMultiFilterSelectedRedux,
  toogleBenchFilter$:toogleYearFilter,
};
export default connect(mapStateToProps, mapDispatchToProps)(ByYear);
