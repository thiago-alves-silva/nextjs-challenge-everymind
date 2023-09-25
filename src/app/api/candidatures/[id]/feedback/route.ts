import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const body = await req.json();
  console.log(params.id);
  console.log(body);

  revalidatePath("/dashboard/candidatures");
  return new NextResponse(undefined, { status: 204 });
};
