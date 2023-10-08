import { NextFunction, Request, Response } from "express";
import { Data } from "./type";
import _ from "lodash";
export async function middleware(
  req: Request & { data?: Data },
  res: Response,
  next: NextFunction,
) {
  res.setHeader(
    "x-hasura-admin-secret",
    "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
  );
  const headers = {
    "x-hasura-admin-secret":
      "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
  };
  try {
    const memoizedFetch = _.memoize(async () =>
      fetch("https://intent-kit-16.hasura.app/api/rest/blogs", {
        method: "GET",
        headers: headers,
      }),
    );
    const response = await memoizedFetch();
    if (response.status === 200) {
      req.data = await response.json();
      next();
    } else {
      res.status(response.status);
    }
  } catch (error) {
    next(error);
  }
}
