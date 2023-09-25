import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const jobId = req.nextUrl.searchParams.get("job_id");

  if (jobId) {
    const response = await fetch(
      new URL(`/vacancy/${jobId}/candidatures`, process.env.API_HOST),
      { cache: "no-store" }
    );

    return response;
  }

  return NextResponse.json(
    { error: "O parâmetro 'job_id' é obrigatório!" },
    { status: 400 }
  );
};
