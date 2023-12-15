const JSONQueryMiddleware = (queryKey) => (req, res, next) => {
  const originalJSON = res.json;
  res.json = (data) => {
    const { query } = req;
    // logic goes here
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
  const startTimestamp = Date.now();
  try {
    console.log(query); // { event { name, summary, timeline [{ name }] } }
    query = query.replace(/\s/g, ""); // {event{name,summary,timeline[{name}]}}
    console.log(query);
    query = query.replace(/(\w+){/g, '"$1":{'); // {"event":{name,summary,timeline[{name}]}}
    console.log(query);
    query = query.replace(/(\w+)[\[]/g, '"$1":['); // {"event":{"name","summary","timeline":[{"name"}]}}
    console.log(query);
    query = query.replace(/(\w+),/g, '"$1":"",'); // {"event":{"name":"","summary":"","timeline":[{"name":""}]}}
    console.log(query);
    query = query.replace(/(\w+)}/g, '"$1":""}'); // {"event":{"name":"","summary":"","timeline":[{"name":""}]}}
    console.log(query);
    const parsedQuery = JSON.parse(query);
    console.log(parsedQuery);
    const data = mapQueryToData(parsedQuery, result);
    console.log("Query parsed in", Date.now() - startTimestamp, "ms");
    return data;
  } catch (error) {
    console.log(error);
    return result;
  }
};

const mapQueryToData = (query, data) => {
  const result = {};
  console.log(query, typeof data, Array.isArray(data));
  if (Array.isArray(query)) {
    return data.map((item) => mapQueryToData(query[0], item));
  } else if (typeof query === "object") {
    for (const key in query) {
      result[key] = mapQueryToData(query[key], data[key]);
    }
    return result;
  }
  return data;
};

module.exports = JSONQueryMiddleware;
