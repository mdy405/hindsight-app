import fetch from "node-fetch";

export default async function fetchPositionsData() {
  let url = process.env.REACT_APP_ENDPOINT_LOGIN + "/api/positions/";
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({}),
  });
}
