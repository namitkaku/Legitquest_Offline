var mysql = require("mysql");
const getmac = require("getmac");
const { getCourts, getBenchesQuery, getErrorMessage } = require("./SqlQuries");
const {
  queryRunner,
  getWhereQueryWithType,
  addStrictWhere,
  getJudgementTableName
} = require("./CommonSql");
const courtCondition = `AND CourtId IN (${[1, 4]?.toString()}) `;
const databasePrefix = "amusoftech_";
const LIMIT = 10;

//const Importer = require("mysql-import");
function HasMySql(username = "root", password) {
  let MAC = getmac.default();
  MAC = MAC.replace(/\:/g, "");
  const databaseName = `${databasePrefix}${MAC}`;
  let respounce = {
    username,
    password,
    databaseName,
    hasConnectionError: false
  };
  try {
    var connection = getConnection(username, password);
    respounce.connectionState = connection.state;
    return respounce;
  } catch (error) {
    respounce.hasConnectionError = true;
    return respounce;
  }

  return respounce;
}

function getConnection(username = "root", password, withDb = false,dbName=null) {
  let cofig = {
    host: "127.0.0.1",
    user: "admin",
    password: "admin123"  
  };

  if (withDb) {
    const databaseName = getDbName(dbName);
    cofig.database = databaseName;
  }
  try {
    var connection = mysql.createConnection(cofig);
    connection.connect();
    return connection;
  } catch (error) {}
}

function createDatabse(OnResults) {
  try {
    const DBNAME = getDbName();
    const QUERY = `CREATE DATABASE IF NOT EXISTS ${DBNAME};`;
    const connection = getConnection("admin", "admin123", false);
    connection.query(QUERY, OnResults);
  } catch (error) {
    return { status: false, message: `Database Not ceated` };
  }
}

function getDbName(dbPostFix) {
  /*  let MAC = getmac.default();
  MAC = MAC.replace(/\:/g, "");
  const databaseName = `${databasePrefix}${MAC}`; */
  if(dbPostFix)
    return `lq_offline_${dbPostFix}`; 
  return "lq_offline_PB_HR"; //"offline_import_test";   ;
}
function readData(QUERY, callBack) {
  const connection = getConnection("admin", "admin123", true);
  connection.query(QUERY /* "select * from bareacts" */, callBack);
}

async function runImportDump(path, onDone) {}
//
const getQuery = (query, searchType) => {
  switch (searchType) {
    case "act-section":
      return `SELECT  Act as Name   FROM judgment_details WHERE  Act LIKE '%${query}%'  limit ${LIMIT}`;
    case "partyname":
      return `SELECT  COALESCE(Petitioner, Responder) as Name   FROM judgment_details WHERE (Petitioner LIKE '%${query}%' OR Responder LIKE '%${query}%') limit ${LIMIT}`;
    case "bench":
      return `SELECT   REPLACE( ExtractValue(Bench, '//text()'),"'",'' ) as Name   FROM judgment_details WHERE  Bench LIKE '%${query}%'  limit ${LIMIT}`;
    case "citation":
      return `SELECT  AlternativeCitation as Name   FROM judgment_details WHERE  AlternativeCitation LIKE '%${query}%'  limit ${LIMIT}`;
    default:
      return `SELECT  COALESCE(Petitioner,Responder,Act,Bench,AlternativeCitation) as Name   FROM judgment_details WHERE (Petitioner LIKE '%${query}%' OR Responder LIKE '%${query}%'  OR Act LIKE '%${query}%' OR Bench LIKE '%${query}%' OR AlternativeCitation LIKE '%${query}%' )   limit ${LIMIT}`;
  }
};
async function getDataForTypeHead(props) {
  const { query, callBack, searchType } = props;
  const connection = getConnection("admin", "admin123", true);
  let QUERY = getQuery(query, searchType);
  //console.log({QUERY});
  return new Promise((resolve, reject) => {
    connection.query(QUERY, (err, result) => {
      let finalReults = [];
      result?.map((item) => {
        const { Name } = item;
        finalReults.push({ Value: Name, Key: Name });
      });

      return err ? reject(err) : resolve(finalReults);
    });
  });
}

const getOffset = (page) => {
  if (page == 1) {
    return 0;
  }
  return (page - 1) * LIMIT;
};
/* 
const getWhereQueryWithType = (query, searchType) => {
  let WHERE = "";
  switch (searchType) {
    case "act-section":
      WHERE = `   Act LIKE '%${query}%'`;
      break;
    case "partyname":
      WHERE = `  (Petitioner LIKE '%${query}%' OR Responder LIKE '%${query}%')`;
      break;
    case "bench":
      WHERE = `Bench LIKE '%${query}%' `;
      break;
    case "citation":
      WHERE = `  AlternativeCitation LIKE '%${query}%' `;
      break;
    default:
      WHERE = `  (Petitioner LIKE '%${query}%' OR Responder LIKE '%${query}%'  OR Act LIKE '%${query}%' OR Bench LIKE '%${query}%' OR AlternativeCitation LIKE '%${query}%'  OR  Judgement LIKE '%${query}%' ) `;
      break;
  }
  return WHERE;
}; */
const getQueryFOrSelectedText = (
  query,
  searchType,
  sortBy = "ASC",
  page = 1
) => {
  const OFFSET = getOffset(page);
  const LIMIT_MAKER = `LIMIT ${LIMIT} OFFSET ${OFFSET}`;

  const toSelect = `judgment_details.Id,CaseId, CONCAT(Petitioner,' V. ',Responder) as LinkText , CONCAT(Petitioner,' V. ',Responder) as PartyName, DateOfJudgement as DateOfJudgment, Bench as Judges, CaseNo, CourtId, SUBSTRING(Judgement, 1, 600) as HighlightedText,CourtId as  CourtName, court_details.Name as CourtName, CaseYear , HEX(judgment_details.Id) as EncryptedId  `;
  const join = `LEFT  JOIN court_details   ON judgment_details.CourtId = court_details.Id   
         LEFT  JOIN judgment_snapshot   ON judgment_details.Id = judgment_snapshot.judgment_id
        `;
  const OrderBy = `ORDER BY  UNIX_TIMESTAMP(STR_TO_DATE(judgment_details.DateOfJudgement, '%d-%m-%y')) ${sortBy}`;

  let WHERE = getWhereQueryWithType(query, searchType);
  const TOTAL_RECORDS = `SELECT COUNT(*) AS CaseCount FROM judgment_details ${join} WHERE ${WHERE}  `;
  let QUERY = `SELECT    ${toSelect}   FROM judgment_details ${join}  WHERE `;

  const FINAL_QUERY = `${QUERY}  ${WHERE}  ${courtCondition}  ${OrderBy}  ${LIMIT_MAKER}`;

  return { QUERY: FINAL_QUERY, TOTAL_RECORDS };
};

const getQueryForSelectedTextByFilterQuery = (
  query,
  searchType,
  sortBy = "ASC",
  page = 1,
  CaseYear,
  filters
) => {
  const OFFSET = getOffset(page);

  let filterArray = [];
  Object.keys(filters).map((item) => {
    if (filters?.[item] != undefined)
      filterArray.push(`${item}="${filters[item]}"`);
  });
  
  const tableName=getJudgementTableName(CaseYear) //`case_${CaseYear}`
  const strictWhere = addStrictWhere(whereAddeder(filterArray));

  const LIMIT_MAKER = `LIMIT ${LIMIT} OFFSET ${OFFSET}`;
  const toSelect = ` ${tableName}.Id,CaseId, CONCAT(Petitioner,' V. ',Responder) as LinkText , CONCAT(Petitioner,' V. ',Responder) as PartyName, DateOfJudgement as DateOfJudgment, Bench as Judges, CaseNo, CourtId, SUBSTRING(Judgement, 1, 600) as HighlightedText,CourtId as  CourtName, court_details.Name as CourtName, CaseYear , HEX( ${tableName}.Id) as EncryptedId `;
  const join = `LEFT  JOIN court_details   ON  ${tableName}.CourtId = court_details.Id   
         LEFT  JOIN judgment_snapshot   ON  ${tableName}.Id = judgment_snapshot.judgment_id
         LEFT  JOIN bareacts ON  ${tableName}.CourtId = bareacts.Id
        `;
  const OrderBy = `ORDER BY  UNIX_TIMESTAMP(STR_TO_DATE( ${tableName}.DateOfJudgement, '%d-%m-%y')) ${sortBy}`;
  console.log({ searchType }); 
  let WHERE = getWhereQueryWithType(query, searchType);
  const TOTAL_RECORDS = `SELECT COUNT(*) AS CaseCount FROM  ${tableName} ${join} WHERE ${WHERE}  ${strictWhere}  ${OrderBy}  `;
  let QUERY = `SELECT  ${toSelect}   FROM  ${tableName} ${join}  WHERE `;

  const FINAL_QUERY = `${QUERY}  ${WHERE} ${strictWhere} ${OrderBy}  ${LIMIT_MAKER}`;

  return { QUERY: FINAL_QUERY, TOTAL_RECORDS };
};

async function getDataForSelectedText(props) {
  const { query, callBack, searchType, pageNumber, sortBy } = props;
  const connection = getConnection("admin", "admin123", true);

  const { QUERY, TOTAL_RECORDS } = getQueryFOrSelectedText(
    query,
    searchType,
    sortBy,
    pageNumber
  );
  console.log({ QUERY });
  const result = await new Promise((resolve, reject) => {
    connection.query(QUERY, (err, result) => {
      let finalReults = [];
      result?.map((item) => {
        finalReults.push({ ...item });
      });

      return err ? reject(err) : resolve(finalReults);
    });
  });

  const caseCount = await new Promise((resolve, reject) => {
    connection.query(TOTAL_RECORDS, (err, result_) => {
      return err ? reject(err) : resolve(result_);
    });
  });

  return { result, caseCount };
}

const getQueryForCase = (query) => {
  const { caseText, encryptionId,selectedYear } = query;
  const tableName = getJudgementTableName(selectedYear)
  const iDrafSelection = `IF( Principle ,TRUE,FALSE ) as IsFoundPrinciple, IF( Reasoning ,TRUE,FALSE ) as IsFoundFacts , IF( Reasoning ,TRUE,FALSE )  as IsFoundReasoning , IF( Discussion	 ,TRUE,FALSE ) as IsFoundDecision,
  IF( ArgumentsOfPetitioner ,TRUE,FALSE ) as IsFoundArgumentsOfPetitioner,
  IF( SkipToQuality ,TRUE,FALSE ) as IsSkiptoQuality ,
  IF( IsContentMismatch    ,TRUE,FALSE ) as IsSkiptoQuality  
  `;
  const toSelect = `Responder as Respondent,Petitioner, court_details.Name as CourtName,${tableName}.Judgement as PlainJudgment ,${tableName}.Judgement  as  Judgement ,  ${tableName}.Id, ${tableName}.CaseId, COALESCE(${tableName}.Petitioner,${tableName}.Responder) as LinkText ,COALESCE(${tableName}.Petitioner,${tableName}.Responder) as PageTitle,Status,  COALESCE(${tableName}.Petitioner,${tableName}.Responder) as PartyName, ${tableName}.DateOfJudgement as DateOfJudgement, ${tableName}.Bench as Bench, COALESCE (AlternativeCitation,Citation) as Citation,Act,Advocates, ${tableName}.CaseNo, ${tableName}.CourtId, SUBSTRING(${tableName}.Judgement, 1, 600) as HighlightedText,   ${tableName}.CaseYear , HEX(${tableName}.Id)  as EncryptedId,HighCourtCaseNo, ${tableName}.tabs as JudgmentTabs,CaseType,Principle,Facts,IsFinalVerfied as IsFinal, IsReportable,NoOfJudges as BenchCount,${iDrafSelection} `;
  const join = `LEFT  JOIN court_details   ON ${tableName}.Id = court_details.Id `;
  return `SELECT  ${toSelect}  FROM ${tableName}  ${join}  WHERE  ${tableName}.Id = CONV('${encryptionId}',16,10)  limit 1 `;
};
async function getDataForCase(props) {
  const { selectedState,selectedYear,query, caseText, encryptionId } = props;
  const connection = getConnection("admin", "admin123", true,selectedState);

  let QUERY = getQueryForCase({ caseText, encryptionId,selectedYear });
  console.log({ QUERY });
  return new Promise((resolve, reject) => {
    connection.query(QUERY, (err, result) => {
      let finalReults = [];
      result?.map((item) => {
        finalReults.push({ ...item });
      });

      return err ? reject(err) : resolve(finalReults);
    });
  });
}

const whereAddeder = (wheres) => {
  //console.log({ wheres });
  let wheresWithAnd = "";
  wheres?.length > 0 &&
    wheres?.map((item, index) => {
      if (wheres[index + 1]) {
        wheresWithAnd += `${item} AND `;
      } else {
        wheresWithAnd += `${item}`;
      }
    });

  return wheresWithAnd;
};
const getQUeryForDropDowns = (props) => {
  const { query, bench, year, court, searchType } = props;
  let WHERE = `WHERE ${getWhereQueryWithType(query, searchType)}`; //    ` WHERE (Petitioner LIKE '%${query}%' OR Responder LIKE '%${query}%'  OR Act LIKE '%${query}%' OR Bench LIKE '%${query}%' OR AlternativeCitation LIKE '%${query}%'  OR  Judgement LIKE '%${query}%' ) `
  const JOIN = `LEFT  JOIN court_details   ON judgment_details.CourtId = court_details.Id`;
  let strictWhereList = [];
  if (court) {
    strictWhereList.push(` judgment_details.CourtId=${court}`);
  }
  /* if (bench) {
    strictWhereList.push(` judgment_details.Bench LIKE '%${bench}%'`);
  } */
  if (year) {
    strictWhereList.push(` judgment_details.CaseYear=${year}`);
  }
  const strictWhere = whereAddeder(strictWhereList);

  /// ExtractValue(Bench, '//text()')  as Bench,
  let QUERY = `SELECT DISTINCT CaseYear, CourtId, NoOfJudges as  Bench, court_details.name as CourtName,court_details.Id as CourtId   FROM judgment_details  ${JOIN} ${WHERE}`;
  if (year || court) {
    QUERY += `AND (${strictWhere})`;
  }
  let MATCH_AGAINST = "";
  if (bench) {
    MATCH_AGAINST = `  AND MATCH(judgment_details.Bench) AGAINST ('${bench}')`;
    QUERY += ` ${MATCH_AGAINST}`;
  }

  return QUERY;
};
async function getDataForDropDowns(props) {
  const connection = getConnection("admin", "admin123", true);
  let QUERY = getQUeryForDropDowns(props);
  console.log({ QUERY });
  return new Promise((resolve, reject) => {
    connection.query(QUERY, (err, result) => {
      let finalReults = [];
      result?.map((item) => {
        finalReults.push({ ...item });
      });

      return err ? reject(err) : resolve(finalReults);
    });
  });
}

async function getDataForSelectedTextWithFilters(props) {
  const {
    query,
    searchType,
    pageNumber,
    sortBy,
    Bench,
    CaseYear,
    CourtId,
    state
  } = props;  
  const connection = getConnection("admin", "admin123", true,state);
 
  const { QUERY, TOTAL_RECORDS } = getQueryForSelectedTextByFilterQuery(
    query,
    searchType,
    sortBy,
    pageNumber,
    CaseYear,
    { NoOfJudges: Bench, CourtId  }
  );
  console.log({QUERY});
  /*  console.log({TOTAL_RECORDS}); */

  let result = [];
  let caseCount = 0;
  try {
    result = await queryRunner(QUERY, connection); 
    caseCount = await queryRunner(TOTAL_RECORDS, connection);
  } catch (error) {
    const message =  getErrorMessage(QUERY)  
    return { result:[], caseCount, message ,error };  
  } 
  return { result, caseCount };
}

async function getCourtsList(props) { 
  const {state,year, query, searchType } = props;
  const connection = getConnection("admin", "admin123", true,state); 
  const sqlQuery = getCourts(query,year, searchType);
  //console.log("CourtQUery", sqlQuery);
  let result =[];
  try { 
    result= await queryRunner(sqlQuery, connection);
  } catch (error) { 
    return {result:[],  error, message:getErrorMessage(sqlQuery)}
  }
  return {result};
}

async function getBenchList(props) {
  const {state,year, query, courtId, searchType } = props;
  const connection = getConnection("admin", "admin123", true,state);
  const sqlQuery = getBenchesQuery(query, Number(courtId), year,searchType);
  //const result = await queryRunner(sqlQuery, connection);
  let result =[];
  try {
    result= await queryRunner(sqlQuery, connection);
  } catch (error) { 
    return {result:[],  error, message:getErrorMessage(sqlQuery)}
  }


  return {result};
}

async function getSectionsList(props) {
  const { act, section } = props;
  const connection = getConnection("admin", "admin123", true);
  const sqlQuery = getBenchesQuery(act, section);
  const result = await queryRunner(sqlQuery, connection);
  return result;
}

async function getActList()
{
  const connection = getConnection("admin", "admin123", true);
  const result = await queryRunner("Select * from bareacts_master",connection);
  // console.log(result);
  return result;
}

async function getActListType(value)
{
  const connection = getConnection("admin", "admin123", true);
  if(value == 1)
  {
    var typeValue = 'Amendment';
    const result = await queryRunner(`Select * from bareacts_master where bareacts_recordtype = '${typeValue}'`,connection);
    return result;
  }
  else if(value == 2)
  {
    var typeValue = 'Act';
    const result = await queryRunner(`Select * from bareacts_master where bareacts_recordtype = '${typeValue}'`,connection);
    return result;
  }
  else if(value == 3)
  {
    var typeValue = 'Regulations';
    const result = await queryRunner(`Select * from bareacts_master where bareacts_recordtype = '${typeValue}'`,connection);
    return result;
  }
  else if(value == 4)
  {
    var typeValue = 'Rules';
    const result = await queryRunner(`Select * from bareacts_master where bareacts_recordtype = '${typeValue}'`,connection);
    return result;
  }
  else if(value == 5)
  {
    var typeValue = 'Ordinance';
    const result = await queryRunner(`Select * from bareacts_master where bareacts_recordtype = '${typeValue}'`,connection);
    return result;
  }
}

async function getActDetail(id)
{
    const connection = getConnection("admin", "admin123", true);
    const result = await queryRunner(`Select * from bareacts where Id = ${id}`,connection);
    return result;
}

module.exports = {
  HasMySql,
  createDatabse,
  readData,
  runImportDump,
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
  getActDetail

};
