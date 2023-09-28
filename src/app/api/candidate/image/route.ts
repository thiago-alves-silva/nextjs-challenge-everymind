import { NextRequest } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const body = await req.json();
  const response = await fetch(
    new URL(`/useraccount/${params.id}/image`, process.env.API_HOST),
    {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }
  );

  return response;
};
