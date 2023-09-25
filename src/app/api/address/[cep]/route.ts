import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { cep: string } }
) => {
  const response = await fetch(`https://viacep.com.br/ws/${params.cep}/json`);
  return response;
};
