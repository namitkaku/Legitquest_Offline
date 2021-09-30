const express = require("express");
//const logger = require('morgan');
const path = require("path");
const bodyParser = require("body-parser");
const {
  getDataForTypeHead,
  getDataForSelectedText,
  getDataForCase,
  getDataForDropDowns,
  getDataForSelectedTextWithFilters,
  getCourtsList,
  getBenchList,
  getSectionsList,
  getActList,
  getActListType,
  getActDetail,
  getActListCentral
} = require("./HasMySql");
const { setLocation } = require("./searhEng/backupLoaction");
//const { searchTypes } = require("../src/utils/config");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/test/:squery", async (req, res) => {
  const { typeHeadPhraseSearch } = require("./searhEng/SearchForTypeHead");
  const data = await typeHeadPhraseSearch(req.params.squery);

  res.setHeader("Content-Type", "application/json");
  res.send({ data, SearchedQuery: req.params.squery });
});

app.get("/search/:index/:type", async (req, res) => {
  const { phraseSearch } = require("./SearchEngine");
  const data = await phraseSearch(
    req.params.index,
    req.params.type,
    req.query.q
  );
  res.json(data);
  /*  res.setHeader('Content-Type', 'application/json'); 
    res.send({message:'Welcome to your express API'}); */
});

app.get("/search-typehead/:query/:type", async (req, res) => {
  /* const {searchJson}  = require("./jsonSearch/searchJson")
    const results  = await searchJson(req.params.query,req.params.type)
    res.setHeader('Content-Type', 'application/json'); 
    res.send({ data: results ,SearchedQuery :req.params.query}); */

  /* const { typeHeadPhraseSearch } = require('./searhEng/SearchForTypeHead');
    const data = await typeHeadPhraseSearch(  req.params.query,req.params.type);  
    res.setHeader('Content-Type', 'application/json'); 
    res.send({ data ,SearchedQuery :req.params.query}); */

  const result = await getDataForTypeHead({
    query: req.params.query,
    searchType: req.params.type,
  });

  res.setHeader("Content-Type", "application/json");
  res.send({ SearchedQuery: req.params.query, data: { resultsList: result } });
});

const sortDecider = (key) => {
  switch (key) {
    case "1":
    case "2":
      return "DESC";
    case "3":
      return "ASC";
    default:
      return "DESC";
  }
};
app.get(
  "/selected-query/:query/:type/:sortBy?/:pageNumber?",
  async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const pageNumber = req.params.pageNumber
      ? Number(req.params.pageNumber)
      : 1;
    const sortBy = sortDecider(req.params.sortBy);

    const { result, caseCount } = await getDataForSelectedText({
      query: req.params.query,
      searchType: req.params.type,
      sortBy,
      pageNumber,
    });

    res.send({
      // caseCount[0] mysql returing the array so getting first record
      CaseCount: caseCount[0]?.CaseCount,
      filterList: "",
      filterValueList: "",
      currentpage: pageNumber,
      caseText: req.params.query,
      CaseDetails: result,
      BenchList: [],
      YearList: [],
      DecStatusList: [],
      SupremeCourtList: {},
      HighCourtList: {},
      OtherCourtList: {},
    });
  }
);
///:caseText/:encryptionId
app.post("/case", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const { selectedState,selectedYear,caseText,encryptionId} = req.body;

    const result = await getDataForCase({
      caseText,
     encryptionId,
     selectedState,selectedYear
  });  

  res.send({
    faqs: [],
    notesData: [],
    viewModel: result[0],
  });
});

app.post("/by-query", async (req, res) => {
  const { query, bench, year, court, searchType } = req.body;
  const result = await getDataForDropDowns(req.body);
  let returnAble = {};

  let yearList = [];
  let benchList = [];
  let courtList = [];
  result?.map((item) => {
    const { CaseYear, CourtId, Bench, CourtName } = item;
    if (CaseYear) {
      yearList.push(CaseYear);
    }
    benchList.push(Bench);
    courtList.push(`${CourtId}-${CourtName}`);
  });
  yearList = getUniue(yearList);
  benchList = getUniue(benchList);
  let tmpCourtList = [];

  courtList = getUniue(courtList);
  courtList?.map((item, key) => {
    const myArr = item.split("-");
    tmpCourtList?.push({ label: myArr[1], value: myArr[0] });
  });
  courtList = tmpCourtList;

  res.send({ query, bench, year, court, yearList, benchList, courtList });
});

app.post("/by-selected-query/", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const {state, query, type, bench, year, court, sortBy, pageNumber } = req.body;
   
  const page  = pageNumber
      ? Number(pageNumber)
      : 1;

 
  const { result, caseCount,error,message } = await getDataForSelectedTextWithFilters({
    query,
    searchType: type,  
    sortBy: sortDecider(sortBy),
    pageNumber:page,
    Bench: bench,
    CaseYear: year,
    CourtId: court,
    state
  });

  res.send({
    // caseCount[0] mysql returing the array so getting first record
    CaseCount: caseCount[0]?.CaseCount,
    filterList: "",
    filterValueList: "",
    currentpage: page,
    caseText: req.params.query,
    CaseDetails: result,
    BenchList: [],
    YearList: [],
    DecStatusList: [],
    SupremeCourtList: {},
    HighCourtList: {},
    OtherCourtList: {},
    error,
    message
  });

  //res.send({  result, caseCount});
});

const removeTags = (body) => {
  var regex = /<(.|\n)*?>/g;
  return body.replace(regex, "");
};
const getUniue = (array, removeHtmlTags = false) => {
  let unique = [];
  if (removeHtmlTags) {
    unique = array.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) == index;
    });
    let tmpun = [];
    unique?.map((item) => {
      tmpun.push({ label: removeTags(item), value: item });
    });
    unique = tmpun;
  } else {
    unique = array.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) == index;
    });
  }
  return unique;
};

app.post("/courts", async (req, res) => { 
  //const{state,year,query, searchType} =req.body
  const {result,error,message } = await getCourtsList(req.body);
  res.send({ list: result,error,message  });
  //res.send({ state,year,query, searchType });
});
app.post("/benchs", async (req, res) => { 
  
  const {result,error,message }  = await getBenchList(req.body);
  res.send({ list: result,error,message });
});

app.post("/sections", async (req, res) => {  
  
  const result = await getSectionsList(req.body);
  res.send({ list: result });
});


app.get('/act-list',async (req,res) => {
  // res.send({data:"Response Coming"});
  const  result = await getActList();
  if(result){
    res.send({
      'status' : 200,
      'data':result
    });
  }
  else
  {
    res.send({
      'status' : 300,
    });
  }
  
});

app.get('/act-list-central',async (req,res) => {
  // res.send({data:"Response Coming"});
  const  result = await getActListCentral();
  if(result){
    res.send({
      'status' : 200,
      'data':result
    });
  }
  else
  {
    res.send({
      'status' : 300,
    });
  }
  
});

app.get('/act-list-type/:id',async (req,res) => {
  const result = await getActListType(req.params.id);
  res.send({'data': result});
})

app.get('/act-detail/:id', async (req,res) => {
  const result = await getActDetail(req.params.id);
  res.send({'data': result});
})



app.get("/backup-location", setLocation);

app.listen(4000, () => console.log("App running on port 4000 🔥"));
