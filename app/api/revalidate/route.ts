import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET!;

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");

  if (!secret || secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const body = await req.json();
  console.log("revalidate body:", body);

  // IMPORTANT: pass REAL paths, not "/[locale]"
  // Example: revalidate a specific locale homepage sent in body:
  const locale = body?.locale ?? "en";
  revalidatePath(`/${locale}`);

  return NextResponse.json({ revalidated: true });
}
