export const TOGGLE_SC_MAT_ITEM = "TOGGLE_SC_MAT_ITEM";
export const TOGGLE_BENCH_FILTER = "TOGGLE_BENCH_FILTER";
export const TOGGLE_ACT_TYPE_FILTER = "TOGGLE_ACT_TYPE_FILTER";
export const TOGGLE_TITLE_FILTER = "TOGGLE_TITLE_FILTER";
export const TOGGLE_DEC_FILTER = "TOGGLE_DEC_FILTER";
export const TOGGLE_YEAR_FILTER = "TOGGLE_YEAR_FILTER";
export const  RESET_FILTERS = "RESET_FILTERS";
export const toogleScMaterial = (selected) => ({
  type: TOGGLE_SC_MAT_ITEM,
  payload: selected,
});



export const toogleActTypeFilter = (selectedActType) => ({
  type: TOGGLE_ACT_TYPE_FILTER   ,
  payload: selectedActType,
});

export const toogleTitleFilter = (selectedTitle) => ({
  type: TOGGLE_TITLE_FILTER,
  payload: selectedTitle,
});

export const toogleBenchFilter = (selectedBench) => ({
  type: TOGGLE_BENCH_FILTER,
  payload: selectedBench,
});

export const toogleDecisionFilter = (selectedDec) => ({
  type: TOGGLE_DEC_FILTER,
  payload: selectedDec,
});

 


export const toogleYearFilter = (selectedYear) => ({
  type: TOGGLE_YEAR_FILTER,
  payload: selectedYear,
});


export const resetFilters = ( ) => ({
  type: RESET_FILTERS, 
});









