const cryptoJS = require("crypto-js");
// not so important key and iv
// just to make sure that the query is not filled with %20, %7B, %7D, etc
const key = "not-so-important-key";

const JSONQueryMiddleware = (queryKey) => (req, res, next) => {
  const originalJSON = res.json;
  res.json = (data) => {
    // for error responses, return the original data
    if ([500, 400, 401, 403, 404].includes(res.statusCode)) {
      return originalJSON.call(res, data);
    }

    const { query } = req;
    const q = query?.[queryKey];
    if (q) {
      data = parseQuery(q, data);
    }
    return originalJSON.call(res, data);
  };
  next();
};

/*
query example:
{
  event {
    name,
    summary
  }
}

return example:
{
  event: {
    name: "event name",
    summary: "event summary"
  }
}

query example:
{
  events [{
    name,
    summary
  }]
}

return example:
{
  events: [{
    name: "event name 1",
    summary: "event summary 1"
  },
  {
    name: "event name 2",
    summary: "event summary 2"
  }]
}
*/
const parseQuery = (query, result) => {
  try {
    query = decodeQuery(query);
    query = query.replace(/\s/g, ""); // {event{name,summary,timeline[{name}]}}
    query = query.replace(/(\w+){/g, '"$1":{'); // {"event":{name,summary,timeline[{name}]}}
    query = query.replace(/(\w+)[\[]/g, '"$1":['); // {"event":{"name","summary","timeline":[{"name"}]}}
    query = query.replace(/(\w+),/g, '"$1":"",'); // {"event":{"name":"","summary":"","timeline":[{"name":""}]}}
    query = query.replace(/(\w+)}/g, '"$1":""}'); // {"event":{"name":"","summary":"","timeline":[{"name":""}]}}
    const parsedQuery = JSON.parse(query);
    const data = mapQueryToData(parsedQuery, result);
    return data;
  } catch (error) {
    console.log(`json-query: Error parsing query: ${error}`);
    return result;
  }
};

const getEmptyData = (query) => {
  if (Array.isArray(query)) {
    return [];
  } else if (typeof query === "object") {
    return {};
  }
  return null;
};

const mapQueryToData = (query, data) => {
  if (Array.isArray(query)) {
    return data?.map((item) => mapQueryToData(query[0], item));
  } else if (typeof query === "object") {
    const result = {};
    for (const key in query) {
      result[key] = mapQueryToData(
        query[key],
        data[key] || getEmptyData(query[key])
      );
    }
    return result || getEmptyData(query);
  }
  return data || getEmptyData(query);
};

const encodeQuery = (query = "") => {
  query = query.replace(/\s/g, ""); // {event{name,summary,timeline[{name}]}}
  let encoded = cryptoJS.AES.encrypt(query, key, {
    mode: cryptoJS.mode.ECB,
  }).toString();
  encoded = encodeURIComponent(encoded);
  return encoded;
};

const decodeQuery = (hash = "") => {
  hash = decodeURIComponent(hash);
  const decoded = cryptoJS.AES.decrypt(hash, key, {
    mode: cryptoJS.mode.ECB,
  }).toString(cryptoJS.enc.Utf8);
  return decoded;
};

module.exports.encodeQuery = encodeQuery;
module.exports = JSONQueryMiddleware;
