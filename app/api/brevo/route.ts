// app/api/brevo/route.ts
import { NextResponse } from "next/server";
import brevo from "@getbrevo/brevo";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Initialize the Brevo API client
    let apiInstance = new brevo.ContactsApi();

    apiInstance.setApiKey(
      brevo.ContactsApiApiKeys.apiKey,
      "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" // Use environment variable for security
    );

    // Create a new contact
    let createNew = new brevo.CreateContact();
    createNew.email = email;
    createNew.listIds = [2];

    // Call the Brevo API
    const data = await apiInstance.createContact(createNew);

    // Return the response
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
