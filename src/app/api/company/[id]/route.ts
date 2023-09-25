import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const response = await fetch(
    new URL(`/companyaccount/${params.id}`, process.env.API_HOST),
    { cache: "no-store" }
  );

  return response;
};
