const defiant = require("defiant.js");

const searchData = require("../search.json");
const searchJson = async (QUERY, type = "party") => {
  const search = await defiant.search(
    searchData,
    `//_source[type="${type}"]/name`
  );
  let searshResults = [];
  search?.map((item) => {
    if (senitizeResults(QUERY, item).length > 0) {
      searshResults.push({ Key: item, Value: item });
    }
  });

  return {
    hitsCount: searshResults.length,
    resultsList: searshResults,
  };
};

const senitizeResults = (query, str) => {
  const regexp = new RegExp(`${query}[a-z]*`, "g");
  const finalArray = Array.from(str.matchAll(regexp), (m) => m[0]);
  // Array [ "football", "foosball" ]
  return finalArray;
};

module.exports = {
  searchJson,
};
