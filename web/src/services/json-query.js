// check server/src/middlewares/json-query.js for the server side
// this file contents should be same as server/src/middlewares/json-query.js

import cryptoJS from "crypto-js";
// just to make sure that the query is not filled with %20, %7B, %7D, etc
const key = "not-so-important-key";

const encodeQuery = (query = "") => {
  query = query.replace(/\s/g, ""); // {event{name,summary,timeline[{name}]}}
  let encoded = cryptoJS.AES.encrypt(query, key, {
    mode: cryptoJS.mode.ECB,
  }).toString();
  encoded = encodeURIComponent(encoded);
  return encoded;
};

export { encodeQuery };
