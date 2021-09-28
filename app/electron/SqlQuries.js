const { getWhereQueryWithType, getJudgementTableName } = require("./CommonSql"); 
 
  
function getCourts(query,year, searchType) {
  const tableName= getJudgementTableName(year)
  const JOIN = `LEFT  JOIN court_details   ON ${tableName}.CourtId = court_details.Id   LEFT  JOIN bareacts ON ${tableName}.CourtId = bareacts.Id`;
   
  let WHERE = getWhereQueryWithType(query, searchType);
  let QUERY = `SELECT DISTINCT  CourtId, court_details.Name as Name  FROM ${tableName}  ${JOIN} WHERE ${WHERE}`;
  return QUERY;
}


function getBenchesQuery(query,courtId, year,searchType) { 
  const tableName= getJudgementTableName(year)  
  let WHERE = getWhereQueryWithType(query, searchType);
  let QUERY = `SELECT DISTINCT  NoOfJudges   FROM ${tableName}  WHERE ${WHERE} AND CourtId=${courtId}`;
  return QUERY;
}
function getSectionsQuery(query,courtId, searchType) { 
  let WHERE = getWhereQueryWithType(query, searchType);
  let QUERY = `SELECT DISTINCT  NoOfJudges   FROM judgment_details  WHERE ${WHERE} AND CourtId=${courtId}`;
  return QUERY;
}

function getErrorMessage(QUERY) {
  return  `Error in Query : ${QUERY} `
}

module.exports = {
  getCourts,
  getBenchesQuery,
  getErrorMessage
};
