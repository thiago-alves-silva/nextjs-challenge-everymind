import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const response = await fetch(
    new URL(`/vacancy/${params.id}`, process.env.API_HOST)
  );

  return response;
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const body = await req.json();
  const response = await fetch(
    new URL(`/vacancy/${params.id}`, process.env.API_HOST),
    {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  revalidatePath("/dashboard/jobs", "page");
  return response;
};
