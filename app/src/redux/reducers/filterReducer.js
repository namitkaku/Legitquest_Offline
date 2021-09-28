import { senitizeAnyArray } from "../../utils/common";
import {
  RESET_FILTERS,
  TOGGLE_SC_MAT_ITEM,
  TOGGLE_BENCH_FILTER,
  TOGGLE_YEAR_FILTER,
  TOGGLE_DEC_FILTER,
  TOGGLE_ACT_TYPE_FILTER,
  TOGGLE_TITLE_FILTER,
} from "../components/sc-material";

const initialState = {
  BenchArray: [],
  Idrafarray: [],
  Yeararray: [],
  Decisionarray: [],

  Partyarray: [],
  SmYearArray: [],
  TitleArray: [],
  SubTitleArray: [],
  ReportNoArray: [],
  ActRuleTypeArray: [],
  NotificationNoArray: [],
  BillNoArray: [],
  MinistryArray: [],
  AuthorArray: [],
  ActTypeArray: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;  
  switch (type) {
    case RESET_FILTERS:
      console.log("IN CLEAR");
      return {
        ...state,
        BenchArray: [],
        Idrafarray: [],
        Yeararray: [],
        Decisionarray: [],
        Partyarray: [],
        SmYearArray: [],
        TitleArray: [],
        SubTitleArray: [],
        ReportNoArray: [],
        ActRuleTypeArray: [],
        NotificationNoArray: [],
        BillNoArray: [],
        MinistryArray: [],
        AuthorArray: [],
        ActTypeArray: [],
      };
    case TOGGLE_DEC_FILTER:
      const Decisionarray = senitizeAnyArray(
        payload,
        [...state.Decisionarray],
        true
      );
      return {
        ...state,
        Decisionarray,
      };
    case TOGGLE_BENCH_FILTER:
      const BenchArray = senitizeAnyArray(payload, [...state.BenchArray], true);
      return {
        ...state,
        BenchArray,
      };

    case TOGGLE_YEAR_FILTER:
      const Yeararray = senitizeAnyArray(payload, [...state.Yeararray], true);
      return {
        ...state,
        Yeararray,
      };

    case TOGGLE_ACT_TYPE_FILTER:
      const ActTypeArray = senitizeAnyArray(
        payload,
        [...state.ActTypeArray],
        true
      );
      return {
        ...state,
        ActTypeArray,
      };

    case TOGGLE_TITLE_FILTER:
      const TitleArray = senitizeAnyArray(payload, [...state.TitleArray], true);
      return {
        ...state,
        TitleArray,
      };

    case TOGGLE_SC_MAT_ITEM:
      const { value } = payload;
      return {
        ...state,
        secondrayMaterial: value,
      };

    default:
      return state;
  }
}
