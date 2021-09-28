import React, { useState } from "react";
import { connect } from "react-redux";
import { setMultiFilterSelectedRedux, setOpenCourtsFilter } from "../redux/components/app-state/appStateAction";
import { FilterLabesl } from "../utils/appConst";
import { getKeyForFilterRev } from "../utils/common";

function LeftFilterCard({
  CourtList,
  onSelect,
  sideFiltersList,
  onSelectCourt,
  multiFilterSelected,
  setMultiFilterSelectedRedux$,
  activeFilters,
  onSelectSubCourt,
  filtredCourtName,
  selectedCourtFilters,
  setOpenCourtsFilter$,
  onSelectSubSubCourt
}) {
   
  const [selectedFilter, setSelectedFilter] = useState();
  const [selectedCourt, setSelectedCourt] = useState();
  const [selectedSubCourt, setSelectedSubCourt] = useState();
  //const [multiFilterSelected, setMultiFilterSelected] = useState([]);
  // const [multiSelectedCourts, setMultiSelectedCourts] = useState([])
  const selecteFilter = (index) => {
    //multiFilterSelected
    if (index == selectedFilter) {
      setSelectedFilter(null);
    } else setSelectedFilter(index);
    selectedFilterHelper(index);
  };
  const selectedFilterHelper = (index) => {
    /* let tmp = [];
    if (![...multiFilterSelected].includes(index)) {
      tmp.push(index);
      setMultiFilterSelectedRedux$([...multiFilterSelected, index]);
    } else {
      const arr = [...multiFilterSelected].filter(function (item) {
        return item !== index;
      });
      tmp = arr;
      setMultiFilterSelectedRedux$([...arr]);
    } */
    setMultiFilterSelectedRedux$(index);
    
  };
  const isActiveFilter = (index) => {
    return [...multiFilterSelected].includes(index);
  };
  //console.log("multiFilterSelected",multiFilterSelected);
  const RenderRadioButton = ({
    compareableLabel,
    CaseCount,
    selected,
    label,
    onClick,
    name,
    defaultValue,
    isSupreamCourt,
  }) => {
    return (
      <div className="custom-radio">
        <label className="f-14 font-weight-normal d-flex">
          <input
            onClick={() => onClick && onClick(compareableLabel)}
            className="d-none"
            type="radio"
            name={`filter_${name ? name : ""}`}
            defaultChecked={selected}
            defaultValue={defaultValue}
          />
          <span> {label}</span>
          {isSupreamCourt && (
            <img
              style={{ marginLeft: 10, marginTop: 6, /* padding: 3.5,   */  maxWidth: 31 ,height: 13
             }}
              src={"https://www.legitquest.com/lq/idraf-icon.png"}
            />
          )}
          <small className="ml-auto text-primary font-weight-bold">
            {CaseCount}
          </small>
        </label>
      </div>
    );
  };
  const getLabelForCourt = (code) => {
    switch (code) {
      case "SupremeCourtList":
        return "Supreme Court";
      case "HighCourtList":
        return "High Court";
      case "OtherCourtList":
        return "TRIBUNAL";
      default:
        break;
    }
  };
  const onCourtSelect = (props) => {
    const { courtName, courtData } = props;
    setSelectedCourt(courtName);
    onSelectCourt && onSelectCourt(courtData);
  };
  const cleanValue = (str) => {
    return str?.replace(",", "")?.trim();
  };
  //console.log("sideFiltersList",sideFiltersList);

  const RenderCourtItem = (props) => {
    const { label, item } = props;

    return (
      <ul
        className={
          isActiveFilter(sideFiltersList.length)
            ? "filter-list mb-0 collapse show list-unstyled"
            : "filter-list mb-0 collapse  list-unstyled"
        }
        id="idraf-filter">
        <li className="mb-1 pl-2">
          <RenderRadioButton
            CaseCount={item?.[label]?.CaseCount}
            selected={item?.[label]?.CourtName === filtredCourtName}
            onClick={(courtName) =>{
              setOpenCourtsFilter$(courtName)
              onCourtSelect({ courtName, courtData: item?.[label] })}
            }
            name={label}
            label={getLabelForCourt(label)?.toUpperCase()}
            compareableLabel={label}
            isSupreamCourt={label?.trim() === "SupremeCourtList"}
          />

          {label?.trim() != "SupremeCourtList" && (
            <ul
              className={
                item?.[label]?.CourtName === filtredCourtName
                  ? "filter-list mb-0 collapse  list-unstyled show"
                  : "filter-list mb-0 collapse  list-unstyled"
              }>
              {item?.[label]?.CaseListViewModel?.map((courtItem, key) => {
                const {
                  SubCourtName,
                  SubCourtCaseCount,
                  SubCourtCaseIds,
                  SubCourtList,
                  IsHaveSegregation
                } = courtItem;
                 
                 
                 
                return (
                  <li key={key} className="mb-1 pl-2">
                    <RenderRadioButton
                    isSupreamCourt={IsHaveSegregation ==="Y"}
                      onClick={(courtName) => { 
                         setSelectedSubCourt(courtName);
                         setOpenCourtsFilter$(SubCourtName)
                          onSelectSubCourt({
                          courtName: SubCourtName,
                          courtData: courtItem,
                        });   
                      }}
                      CaseCount={SubCourtCaseCount}
                      label={SubCourtName}
                      compareableLabel={SubCourtName}
                      name={`${label}_${SubCourtName}`}
                      selected={
                        /* cleanValue(activeFilters?.Courtarray) == SubCourtName */
                        selectedCourtFilters?.includes( SubCourtName )
                      }
                    /> 
                    {SubCourtList && (
                      <ul className={ selectedCourtFilters?.includes( SubCourtName )? "mb-0 collapse  list-unstyled show" :"mb-0 collapse  list-unstyled"}>
                        {SubCourtList?.map((subC, key_) => {
                          const {SubCourtName,SubCourtCaseIds,SubCourtCaseCount,IsHaveSegregation} =subC
                          return (
                            <li key={key_} className="mb-1 pl-2">
                              <RenderRadioButton
                              isSupreamCourt={IsHaveSegregation ==="Y"}
                               onClick={(courtName) => {
                                 //console.log("courtName",courtName);
                                //setSelectedSubCourt(courtName); 
                                setOpenCourtsFilter$(courtName)
                                onSelectSubSubCourt({ 
                                  courtName: subC?.SubCourtName,
                                  courtData: subC,
                                });
                              }}
                                CaseCount={SubCourtCaseCount}
                                label={subC?.SubCourtName}
                                compareableLabel={subC?.SubCourtName}
                                name={subC?.SubCourtName}
                                selected={ 
                                  selectedCourtFilters?.includes( subC?.SubCourtName )
                                  
                                }
                              />
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      </ul>
    );
  };
  const _renderCourtFilters = () => {
    return (
      <div id="idraf" className="form-group mb-0">
        <label
          onClick={() => selecteFilter(sideFiltersList.length)}
          className={
            isActiveFilter(sideFiltersList.length)
              ? "mb-2 text-muted d-flex align-items-center  "
              : "mb-2 text-muted d-flex align-items-center collapsed"
          }
          data-toggle="collapse"
          data-target="#idraf-filter"
          aria-expanded={isActiveFilter(sideFiltersList.length)}>
          <div className="arrow-triangle mr-2" /> By Court
        </label>
        {CourtList?.map((item, key) => {
          return (
            <RenderCourtItem
              label={Object.keys(item)[0]}
              item={item}
              key={key}
            />
          );
        })}
      </div>
    );
  };
  return (
    <div>
      {CourtList?.length > 0 && _renderCourtFilters()}
      {/* sideFiltersList?.map((item, key) => {
        //console.log(">>",FilterLabesl?.[Object.keys(item)[0]]);
        
        return (
          <div key={key} className="form-group mb-0">
            <label
              onClick={() => selecteFilter(key)}
              className={
                isActiveFilter(key)
                  ? "mb-2 text-muted d-flex align-items-center"
                  : "mb-2 text-muted d-flex align-items-center collapsed"
              }
              data-toggle="collapse"
              data-target="#discipline"
              aria-expanded={isActiveFilter(key)}> 
              <div className="arrow-triangle mr-2" /> By {FilterLabesl?.[Object.keys(item)[0]]}
            </label>
            <ul
              className={
                isActiveFilter(key)
                  ? "filter-list mb-0 collapse show list-unstyled"
                  : "filter-list mb-0 collapse  list-unstyled"
              }
              id="discipline">
              {Object.values(item)[0]?.map((itemFileter, key) => {
                const keyData = getKeyForFilterRev(Object.keys(item)[0]);
 
                return (
                  <li key={key} className="mb-1 pl-2">
                    <div className="custom-radio">
                      <label className="f-14 font-weight-normal d-flex">
                        <input
                          onChange={() =>
                            onSelect && onSelect({ item, itemFileter })
                          }
                          className="d-none courtFilter"
                          type="radio"
                          name={`filter_${Object.keys(item)[0]}`}
                          defaultChecked={
                            cleanValue(
                              activeFilters?.[Object.keys(item)[0]]
                            ) ===
                            itemFileter[
                              Object.keys(itemFileter)[keyData]
                            ]?.toString()
                          }
                        />
                        {Object.keys(item)[0] === "BenchList" ? (
                          <>
                            <span>
                              {itemFileter[Object.keys(itemFileter)[0]]}
                            </span>
                            <small className="ml-auto text-primary font-weight-bold">
                              {itemFileter[Object.keys(itemFileter)[1]]}
                            </small>
                          </>
                        ) : (
                          <>
                            {" "}
                            <span>
                              {itemFileter[Object.keys(itemFileter)[1]]}
                            </span>
                            <small className="ml-auto text-primary font-weight-bold">
                              {itemFileter[Object.keys(itemFileter)[0]]}
                            </small>
                          </>
                        )}
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      }) */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  multiFilterSelected: state.appState.multiFilterSelected,
  activeFilters: state.appState.activeFilters,
  selectedCourtFilters: state.appState.selectedCourtFilters, 
});


const mapDispatchToProps = {
  setMultiFilterSelectedRedux$: setMultiFilterSelectedRedux,
  setOpenCourtsFilter$:setOpenCourtsFilter
};
export default connect(mapStateToProps, mapDispatchToProps)(LeftFilterCard);
