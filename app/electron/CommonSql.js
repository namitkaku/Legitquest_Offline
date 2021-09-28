const getWhereQueryWithType = (query, searchType) => {
  let WHERE = "";
  switch (searchType) {
    case "act-section":
      WHERE = `  Act LIKE '%${query}%'`;
      break;
    case "partyname":
      WHERE = `  (Petitioner LIKE '%${query}%' OR Responder LIKE '%${query}%')`;
      break;
    case "bench":
      WHERE = `Bench LIKE '%${query}%' `;
      break;
    case "citation":
      WHERE = ` (Citation LIKE '%${query}%' OR AlternativeCitation LIKE '%${query}%') `;
      break;
    default:
      WHERE = `  (Petitioner LIKE '%${query}%' OR Responder LIKE '%${query}%'    OR  Judgement LIKE '%${query}%' ) `;
      break;
  }
  ///console.log({WHERE,query,searchType});
  return WHERE;
};

async function queryRunner(QUERY, connection) {
  try {
    return new Promise((resolve, reject) => {
      connection.query(QUERY, (err, result) => {
        let finalReults = [];
        result?.map((item) => {
          finalReults.push({ ...item });
        });
  
        return err ? reject(err) : resolve(finalReults);
      });
    });
  } catch (error) {
    return {error,message:`Error in Query : ${QUERY}`}
  }
}
function addStrictWhere(queryWhere) {
  if(queryWhere){
    return `AND ${queryWhere}`
  }
  return "";
  
}

function getJudgementTableName(year) {
  return `case_${year}`
}
module.exports = {
  getWhereQueryWithType,
  queryRunner,
  addStrictWhere,
  getJudgementTableName
};
