import { NextFunction, Request, Response } from "express";
import { Data } from "./type";

export async function getData() {
  const data = await fetch("https://intent-kit-16.hasura.app/api/rest/blogs", {
    method: "GET",
    headers: {
      "x-hasura-admin-secret":
        "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
    },
  });
  return data;
}

export async function middleware(
  req: Request & { apiData: Data },
  res: Response,
  next: NextFunction,
) {
  const headers = {
    "x-hasura-admin-secret":
      "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
  };
  try {
  } catch (error) {}
  const response = await fetch(
    "https://intent-kit-16.hasura.app/api/rest/blogs",
    {
      method: "GET",
      headers: headers,
    },
  );
  if (response.status === 200) {
    req.apiData = (await response.json()) as Data;
    next();
  } else {
    res.status(response.status).send(response.statusText);
  }
}
