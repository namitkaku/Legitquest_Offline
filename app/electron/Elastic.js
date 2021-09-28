const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });
async function getResultsForTypeHead(query) {
  // promise API
  const result = await client.search({
    index: "my-index",
    body: {
      query: {
        match: { hello: "world" },
      },
    },
  });
  return result;
}

module.exports = getResultsForTypeHead;
