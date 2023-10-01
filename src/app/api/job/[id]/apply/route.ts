import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const response = await fetch(new URL(`/candidacy`, process.env.API_HOST), {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  revalidatePath("/dashboard/jobs", "layout");
  return response;
};
