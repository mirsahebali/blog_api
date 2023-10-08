import _ from "lodash";
import { Data } from "./type";
async function getData() {
  const headers = {
    "x-hasura-admin-secret":
      "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
  };
  try {
    const response = await fetch(
      "https://intent-kit-16.hasura.app/api/rest/blogs",
      {
        method: "GET",
        headers: headers,
      },
    );
    if (response.status != 200 || !response.ok) {
      return response.statusText;
    }
    return (await response.json()) as Data;
  } catch (error) {
    throw new Error(error);
  }
}
export const values = _.memoize(getData);
