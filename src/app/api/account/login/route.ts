import { UserLogin } from "@/types/IUserLogin";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const loginType = {
    candidate: "user",
    company: "company",
  };
  const bodyRequest = (await req.json()) as UserLogin;

  const response = await fetch(
    new URL(`/login/${loginType[bodyRequest.user]}`, process.env.API_HOST),
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyRequest),
    }
  );

  return response;
};
