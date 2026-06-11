// app/api/brevo/route.ts
import { NextResponse } from "next/server";
import { BrevoClient } from "@getbrevo/brevo";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "A valid email is required" },
        { status: 400 }
      );
    }

    const brevoKey =
      process.env.BREVO_API_KEY ?? process.env.NEXT_PUBLIC_BREVO_API;

    if (!brevoKey) {
      throw new Error("Brevo API key is not defined in environment variables");
    }

    const brevo = new BrevoClient({
      apiKey: brevoKey,
    });

    const data = await brevo.contacts.createContact({
      email,
      listIds: [2],
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
