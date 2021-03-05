import fetch from "isomorphic-fetch";
require("es6-promises");

export function apiFetch(path: string, method?: string, data?: any) {
  const options: any = {};
  const headers = {
    "Content-Type": "application/json",
    Accepts: "application/json",
  };
  if (!method) method = "GET";
  if (method.toUpperCase() !== "GET") {
    options["body"] = JSON.stringify(data);
  }

  const url = `//${process.env.REACT_APP_HOST}/api/${path}`;

  return fetch(url, {
    method: method.toUpperCase(),
    headers,
    ...options,
  }).then((response) => response.json());
}