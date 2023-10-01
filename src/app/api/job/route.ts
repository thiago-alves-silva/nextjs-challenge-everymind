import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import getUserFromTokenOnServerSide from "@/utils/getUserFromTokenOnServerSide";

export const GET = async (req: NextRequest) => {
  const companyId = req.nextUrl.searchParams.get("company_id");

  if (companyId) {
    const response = await fetch(
      new URL(`/vacancy/company/${companyId}`, process.env.API_HOST),
      { cache: "no-store" }
    );
    return response;
  }

  const url = new URL(`/vacancy`, process.env.API_HOST);
  url.search = req.nextUrl.search;

  const response = await fetch(url);
  return response;
};

// cria uma vaga
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const user = getUserFromTokenOnServerSide();
  const response = await fetch(new URL(`/vacancy`, process.env.API_HOST), {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.assign(body, { id_company: user?.id })),
  });

  revalidatePath("/dashboard/jobs", "page");
  return response;
};
