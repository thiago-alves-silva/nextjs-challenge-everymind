import { Company } from "@/types/ICompany";
import getUserFromTokenOnServerSide from "@/utils/getUserFromTokenOnServerSide";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = (await req.json()) as Company;
  const response = await fetch(
    new URL("/companyaccount", process.env.API_HOST),
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  return response;
};

export const PUT = async (req: NextRequest) => {
  const user = getUserFromTokenOnServerSide();
  const body = (await req.json()) as Company;
  const response = await fetch(
    new URL(`/companyaccount/${user?.id}`, process.env.API_HOST),
    {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  return response;
};
