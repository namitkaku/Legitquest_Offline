const ES_BACKUP_URL = "app/my-downloads/es/indexes";

//elastic setup
/**
 *1. setup the path.repo to config /Users/amusoftech/Documents/esbackup
 * example :
 * path.repo: /Users/amusoftech/Documents/esbackup
 *
 * 2. create/register repositry
 */

/**
 * Databse name  : lq_offline
 * username : admin
 * password : admin123
 */

/**
 * @description  fetching data for only punjab&Harayana and supreme court
 */
const courtIds = [
  1, //supreme court
  4, //punjab &haryana
];

const searchTypes = [
  "act-section",
  "partyname",
  "bench",
  "citation",
  "freetext",
];

module.exports = {
  ES_BACKUP_URL,
  courtIds,
  searchTypes,
};
