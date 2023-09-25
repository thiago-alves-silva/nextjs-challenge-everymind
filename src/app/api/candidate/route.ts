import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const url = new URL("/useraccount", process.env.API_HOST);
  url.search = req.nextUrl.search;

  const response = await fetch(url);

  return response;
};
