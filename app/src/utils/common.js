export function titleCase(str) {
  if (str) {
    var splitStr = str?.toLowerCase()?.split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }
  return str;
}

export function lowerCaseFirstLetter(string) {
  //return string.charAt(0).toUpperCase() + string.slice(1);
  return string.charAt(0).toLowerCase() + string.slice(1);
}

export const removeTags = (body) => {
  var regex = /<(.|\n)*?>/g;
  return body.replace(regex, "");
};
export const getCurrentActiveUsableFilters = (activeFilters) => {
  let tempActiveFilters = [];
  Object.keys(activeFilters)?.map((item, key) => {
    if (getKeyForFilter(item) != "none")
      tempActiveFilters = {
        ...tempActiveFilters,
        [getKeyForFilter(item)[0]]: activeFilters?.[item],
      };
  });
  return { ...tempActiveFilters };
};

export const scrollToElment = (document, id) => {
  document
    ?.getElementById(id)
    ?.scrollIntoView(/* { behavior: "smooth", block: "center" } */ true);
};
export const getFilterKey = (flag) => {
  switch (flag) {
    case "YearList":
      return "Yeararray";
    case "BenchList":
      return "BenchArray";
    case "DecStatusList":
      return "Decisionarray";
    default:
      return flag;
  }
};

export const goToHomePage = (history) => {
  //console.log("history",history);
  if (history?.location?.pathname != "/home") {
    history.push("/home");
  }
};

export const formatString = (str) => {
  return str.replace(/\s/g, "-");
};
export const getKeyForFilter = (flag) => {
  switch (flag) {
    case "YearList":
      return ["Yeararray", 1];
    case "BenchList":
      return ["BenchArray", 0];
    case "DecStatusList":
      return ["Decisionarray", 2];

    default:
      return "none";
  }
};

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export const getPlacheHolder = (searchType) => {
  switch (searchType) {
    case "act-section":
      return "Act Name";
    case "freetext":
      return "Search free text..";
    case "partyname":
      return "petitioner/respondent";
    case "bench":
      return "Judge Name";
    case "citation":
      return "Search through citation";
  }
};

export const getKeyForFilterRev = (flag) => {
  switch (flag) {
    case "YearList":
      return 1;
    case "BenchList":
      return 0;
    case "DecStatusList":
      return 2;

    default:
      return "none";
  }
};

export const getSanitisedFilterString = (initialString) => {
  //v1, => will return array with 2 elems
  if (initialString?.length < 2) {
    return `filter=${initialString.toString()}&filterValueList=`;
  } else {
    return `filter=&filterValueList=${initialString?.toString()}`;
  }
};

/**
 *
 * @param {*} itemToCheck
 * @param {*} arrayOfItem
 * @returns {[]}
 * @description will return an array, this function will check the the passed [itemToCheck] params exist in array. if it exist, it will remove it otherwise it will push into it
 */
export const senitizeAnyArray = (
  itemToCheck,
  arrayOfItem,
  allowOverRide = false
) => {
  let tmpFilters = arrayOfItem;
  if (tmpFilters?.includes(itemToCheck)) {
    //remove
    const index = tmpFilters.indexOf(itemToCheck);
    if (index > -1) {
      tmpFilters.splice(index, 1);
    }

    return [...tmpFilters];
  } else {
    if (!allowOverRide) return [...tmpFilters, itemToCheck];
    return [itemToCheck];
  }
};

export const cleanString = (str)=>{
  /* if(str) 
  return  str.replace(/[^a-zA-Z ]/g, "")  */
  return str
}

export const sqlify = (str)=>{ 
  return str?.replace(/'/g, "\\'");
   
}
export const senitizeResults = (query, str) => {
  const regexp = new RegExp(`${query}[a-z]*`, "g");
  const finalArray = Array.from(str.matchAll(regexp), (m) => m[0]);
  // Array [ "football", "foosball" ]
  return finalArray;
};
