import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string; filename: string } }
) => {
  const response = await fetch(
    new URL(`/useraccount/image/${params.filename}`, process.env.API_HOST),
    { cache: "no-store" }
  );

  return response;
};
