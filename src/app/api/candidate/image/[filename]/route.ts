import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { filename: string } }
) => {
  if (params.filename) {
    const response = await fetch(
      new URL(`/useraccount/image/${params.filename}`, process.env.API_HOST),
      { cache: "no-store" }
    );

    if (response.ok) {
      return response;
    }
  }

  return await fetch(new URL("/undefined.jpg", req.nextUrl.origin));
};
