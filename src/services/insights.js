import fetch from "node-fetch";

export default async function fetchInsightsData(tokens) {
  let url = process.env.REACT_APP_ENDPOINT_LOGIN + "/api/insights/data";
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(tokens),
  });
}
