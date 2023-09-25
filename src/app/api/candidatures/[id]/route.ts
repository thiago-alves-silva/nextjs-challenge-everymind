import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const response = await fetch(
    new URL(`/candidacy/${params.id}`, process.env.API_HOST),
    { cache: "no-store" }
  );

  return response;
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const body = await req.json();
  const response = await fetch(
    new URL(`/candidacy/${params.id}`, process.env.API_HOST),
    {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }
  );

  revalidatePath("/dashboard/candidatures");
  return response;
};
