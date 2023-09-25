import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const response = await fetch(
    new URL(`/candidacy/curriculum/${params.id}`, process.env.API_HOST)
  );

  return response;
};
