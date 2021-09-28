export const IDRAF_IDS_COUNT_FIND_UPTO = 500;
export const IDRAF_TABS = [
  { key: "IsFoundPrinciple", label: "Issues", img: "issue.svg", id: "issue" },
  { key: "IsFoundFacts", label: "Facts", img: "fact.svg", id: "facts" },
  {
    key: "IsFoundArgumentsOfPetitioner",
    label: "Arguments Of Petitioner",
    img: "arguments.svg",
    id: "argofpetitioner"
  },
  {
    key: "IsFoundArgumentsOfResponder",
    label: "Arguments Of Respondent",
    img: "arguments.svg",
    id: "argofresponder"
  },
  {
    key: "IsFoundReasoning",
    label: "Reasoning",
    img: "reasoning.svg",
    id: "reasoning"
  },
  {
    key: "IsFoundDecision",
    label: "Decision",
    img: "decision.svg",
    id: "decision"
  },
  { key: "IsFoundCaseCited", label: "Cited", img: "citation.svg", id: "cited" }
  /* { key: "IsFoundStatute", label: "Statute", img:"" },
  { key: "IsFoundRatio", label: "Foreign Case Cited", img:"" },
  { key: "IsFoundMajorityConcurring", label: "Majority Concurring", img:"" },
  { key: "IsFoundMinorityDissenting", label: "Minority Dissenting", img:"" }, */
];

export const IDRAF_HIGELIGHT_COLORS = {
  cited: "#ff8000",
  referred: "#FFFF00",
  approved: "#0000FF",
  distinguished: "#008000",
  overruled: "#FF0000",
  issue: "#8fc9f7",
  facts: "#abe0b2",
  argofpetitioner: "#eadad7",
  argofresponder: "#ecead3",
  reasoning: "#ebdef0",
  decision: "#edbb99"
};
/* 
selectedargofpetitioner-1 = #EADAD7
selectedargofresponder-1 = #ECEAD3
selectedfacts-1 = #C3D9B1
selectedratio-1 = #C9E0EE
selectedstatueresult-1 = #E8DCE2
selectedcasecited-1 = #D6EFF1
selectedreasoning-1 = #EBDEF0
selectedmajorityconcurring-1 = #F6DDCC
selectedminoritydissenting-1 = #A9DFBF
selecteddecision-1 = #EDBB99
selectedissue-1 = #8fc9f7 */

export const IMAGE_BASE_URL = "https://www.legitquest.com/images/";
export const OTHER_IMAGE_BASE_URL = "https://www.legitquest.com/";

export const REPORT_A_PROBLEM = [
  { value: "Content", name: "problem_area" },
  { value: "Segregation", name: "problem_area" },
  { value: "Judge Name", name: "problem_area" },
  { value: "Court", name: "problem_area" },
  { value: "Citation", name: "problem_area" },
  {
    value: "Others (If others, Please specify the details) ",
    name: "problem_area"
  }
];

export const secMaterialList = [
  { label: "Judgments", value: 0 },
  { label: "Act", value: 11 },
  { label: "Notifications", value: 4 },
  { label: "Bills in Parliament", value: 1 },
  { label: "Reports of commission and committees", value: 5 },
  { label: "Law commission report", value: 3 },
  { label: "Constituent assembly debate", value: 2 },
  { label: "Treaties", value: 6 },
  { label: "News", value: 10 },
  { label: "Interviews", value: 9 },
  { label: "Columns", value: 8 }
];
export const filterKeys = [
  "BenchList",
  "YearList",
  "DecStatusList",

  "TitleList",
  "SubTitleList",
  "BillNoList",
  "ReportNoList",
  "NotificationNoList",
  "AuthorList",
  "ActTypeList",
  "MinistryList",
  "ActRulesTypeList"
  /* "SmYearArray",  
  "TitleArray",  
  "SubTitleArray",  
  "ReportNoArray",  
  "ActRuleTypeArray",  
  "NotificationNoArray",  
  "BillNoArray",  
  "MinistryArray",  
  "AuthorArray",  
  "ActTypeArray",  */
];
export const FilterLabesl = {
  BenchList: "Bench",
  YearList: "Year",
  DecStatusList: "Dispositions",
  SmYearArray: "SmYearArray",
  TitleArray: "Title",
  SubTitleArray: "Sub Title",
  ReportNoArray: "Report No",
  ActRuleTypeArray: "Act Rule Type",
  NotificationNoArray: "Notification No",
  BillNoArray: "Bill No",
  MinistryArray: "Ministry",
  AuthorArray: "Author",
  ActTypeArray: "Act Type"
};

export const styleAnchor = { color: "#3646eb", cursor: "pointer" };

export const testimonialText = [
  {
    descr:
      "Legitquest seems to be a one of its kind Legal Research engine with features like iDRAF and iGraphics. It helped me find out relevant cases with just One Click to reach to the reasoning and decision of the case. A feature like iDRAF has helped me save a lot of time while analysing a case.",
    name: "Rahul Sinha Roy",
    auth: "Assistant Professor, LLoyd law College"
  },
  {
    descr:
      "Legitquest is sure to transform and revolutionise the way Judges, Attorneys, law students, professors, researchers and scholars do legal research.",

    name: "Pratyush Kumar",
    auth: "Research Associate - NLU, Delhi"
  },
  {
    descr:
      "  I am very impressed by your search engine, as it is unique in the sense that it greatly reduces the time taken in legal research by straightaway leading to the main findings/ observations of a judgment, including issues raised therein etc. I hope that you include all state electricity regulatory commissions as well, since presently no search engine is maintaining a database of its case laws, and regulations.",

    name: "Hemant Singh",
    auth: "Founder & Managing Partner, Charter Law Chambers, Attorneys at Law"
  }
];

export const INDIAN_STATES = [
  /* { code: "AN", label: "Andaman and Nicobar Islands" },
  { code: "AP", label: "Andhra Pradesh" },
  { code: "AR", label: "Arunachal Pradesh" },
  { code: "AS", label: "Assam" },
  { code: "BR", label: "Bihar" },
  { code: "CG", label: "Chandigarh" },
  { code: "CH", label: "Chhattisgarh" },
  { code: "DN", label: "Dadra and Nagar Haveli" },
  { code: "DD", label: "Daman and Diu" },
  { code: "DL", label: "Delhi" },
  { code: "GA", label: "Goa" },
  { code: "GJ", label: "Gujarat" },
  { code: "HP", label: "Himachal Pradesh" },
  { code: "JK", label: "Jammu and Kashmir" },
  { code: "JH", label: "Jharkhand" },
  { code: "KA", label: "Karnataka" },
  { code: "KL", label: "Kerala" },
  { code: "LA", label: "Ladakh" },
  { code: "LD", label: "Lakshadweep" },
  { code: "MP", label: "Madhya Pradesh" },
  { code: "MH", label: "Maharashtra" },
  { code: "MN", label: "Manipur" },
  { code: "ML", label: "Meghalaya" },
  { code: "MZ", label: "Mizoram" },
  { code: "NL", label: "Nagaland" },
  { code: "OR", label: "Odisha" },
  { code: "PY", label: "Puducherry" }, */
  { code: "PB_HR", label: "Punjab And Haryana" },
  { code: "RJ", label: "Rajasthan" },
  { code: "SK", label: "Sikkim" },
  { code: "TN", label: "Tamil Nadu" },
  { code: "TS", label: "Telangana" },
  { code: "TR", label: "Tripura" },
  { code: "UP", label: "Uttar Pradesh" },
  { code: "UK", label: "Uttarakhand" },
  { code: "WB", label: "West Bengal" }
];

export const AVILABLE_YEARS = [
  2001,
  2002,
  2003,
  2004,
  2005,
  2006,
  2007,
  2008,
  2009,
  2010,
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017,
  2018,
  2019,
  2020,
  2021
];
