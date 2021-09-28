export const TOGGLE_COURT_FILTER = " TOGGLE_COURT_FILTER";
export const TOGGLE_BENCH_FILTER = " TOGGLE_BENCH_FILTER";
export const TOGGLE_YEAR_FILTER = " TOGGLE_YEAR_FILTER";

export const toggleCourtFilter = (selectedFilter) => ({
  type: TOGGLE_COURT_FILTER,
  payload: selectedFilter,
});

export const toggleBenchFilter = (selectedFilter) => ({
  type: TOGGLE_BENCH_FILTER,
  payload: selectedFilter,
});

export const toggleYearFilter = (selectedFilter) => ({
  type: TOGGLE_YEAR_FILTER,
  payload: selectedFilter,
});
