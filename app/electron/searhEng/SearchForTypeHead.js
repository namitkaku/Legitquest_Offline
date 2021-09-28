//const { Client } = require("@elastic/elasticsearch");
const { getClient } = require("./getClient");
//const client = new Client({ node: "http://localhost:9200" });


/* citation,
bench,
party */
const typeHeadPhraseSearch = async (phrase, type) => {

  //const ccc =getClient()
  let must = [
    {
      "match": {
          "name.autocomplete": {
              "boost": 2.0,
              "query":`${phrase}`,
              "fuzziness": 1
          }
      }
  },
  ];
  if (type != "freetext") {
    must.push({
      match: {
        type: senitizeType(type),
      },
    });
  }
  const hits = [];
  const searchResult = await getClient()
    .search({
      index: "lqautocompleteindexdec2020",
      body: {
        /* query: {
          bool: {
            must,
          },
        }, */

         
          "size": 10,
          "suggest": {
              "name": {
                  "text": `${phrase}`,
                  "term": {
                      "field": "name.didumean",
                      "prefix_length": 5
                  }
              }
          },
          "aggs": {
              "nameagg": {
                  "terms": {
                      "field": "name.autocomplete",
                      "size": 50,
                      "include": `${phrase}.*` 
                  }
              }
          },
          "query": {
              "bool": { 
                must
              }
          }
       
      },
    })
    .catch((err) => {});
  if (searchResult?.body?.hits?.hits?.length > 0) {
    hits.push(...searchResult.body.hits.hits);
  }
  let resultsList = [];
  searchResult?.body?.aggregations?.nameagg?.buckets?.map((item) => {
    const { key } = item;
    resultsList.push({ Key: key, Value: key });
  });
  return {
    hitsCount: hits.length,
    resultsList,
  };
};

function senitizeType(type) {
  switch (type) {
    case "partyname":
      return "party";
    default:
      return type;
  }
}
module.exports = {
  typeHeadPhraseSearch,
};
